// import firestore
const { db } = require('../config/db');
const ApiError = require('../utilities/ApiError');
const { fileServerUpload, storageBucketUpload, getFilePathFromUrl, deleteFilePathFromBucket, validateFile} = require('../utilities/fileServices');

module.exports = {
    // CRUD to talk to database for character related queries

    // GET's all documents in character collection
    async getAllCharacters(req, res, next) {
        try {
            const response = await db.collection('characters').get();

            if (response.empty) {
                return next(ApiError.badRequest("No matching characters exists."));
            } else {
                let docs = [];
                response.forEach((doc) => {
                    docs.push({
                        // these are all the collection fields in the database
                    id: doc.id,
                    name: doc.data().name,
                    filmAppearances: Number(doc.data().filmAppearances),
                    lightsaberColor: doc.data().lightsaberColor,
                    sideOfForce: doc.data().sideOfForce,
                    description: doc.data().description,
                    characterImage: doc.data().characterImage,
                    });
                    console.log(doc.id, `=>`, doc.data());
                });
                res.send(docs);
            }

        } catch (error) {
            return next(ApiError.internal("Your character request could not be processed at this time", error));
        }
    },


    // GET a single document in the character collection
    async getCharacterById(req, res, next) {
        try {
            const response = await db.collection('characters').doc(req.params.id).get();

            // 400 error - checking for non-existant docs
            if (!response.exists) {
                return next(ApiError.badRequest("No matching character exists."));
            } 
                else {
            console.log(response.data());
            res.send(response.data());
        }

        } catch (error) {
            return next(ApiError.internal("Your food request could not be processed at this time", error));
        }
    },


    // POST a single document to the database character collection
    async postCharacterById(req, res, next) {
        console.log(req.body);

        // File Validation
        error = validateFile(req.files, 1000000);
        if (error) {
            console.log(error);
            return next(ApiError.badRequest(`Your image does not requirements - ${error.message}`));
        } 

        // File uploading
        let downloadUrl = null;
        try {
            // Server-Upload part 1
            console.log(`req.files ${req.files.characterImage}`)
            const fileName = fileServerUpload(req.files.characterImage);

            // Server-Upload part 2
            downloadUrl = await storageBucketUpload(fileName);
            console.log(`download url on character controller ${downloadUrl}`)
        } catch (error) {
            return next(ApiError.internal('An error occured in uploading image to storage', error));
        }

        try {
            // Save image url to storage bucket
            const response = await db.collection('characters').add({
            // body in req.body is from the body of the form (the input fields)
            name: req.body.name,
            filmAppearances: Number(req.body.filmAppearances),
            lightsaberColor: req.body.lightsaberColor,
            sideOfForce: req.body.sideOfForce,
            description: req.body.description,
            characterImage: downloadUrl
            });
            console.log(`Added a single character ${response.id} to the database`);
            res.send(response.id);

        } catch (error) {
            return next(ApiError.internal("Your food request could not be processed at this time", error));
        }
    },


    // PUT (update) a single document's collection information in the database
    async putCharacterById(req, res, next) {
        console.log(req.body);

        let downloadUrl = null;

        if (req.files) {
            // File Validation
            error = validateFile(req.files, 1000000);
            if (error) {
                console.log(error);
                return next(ApiError.badRequest(`Your image does not requirements - ${error.message}`));
            } 

            // File uploading
            try {
                // Server-Upload part 1
                console.log(`Updating image in db`);
                const fileName = fileServerUpload(req.files.characterImage);

                // Server-Upload part 2
                downloadUrl = await storageBucketUpload(fileName);
                console.log(downloadUrl);

                // Here deletes old image from storage
                if (req.body.filePath) {
                    console.log(`Deleting old image in storage: ${req.body.filePath}`)
                    const bucketResponse = await deleteFilePathFromBucket(req.body.filePath); 
                }

            } catch (error) {
                return next(ApiError.internal('An error occured in uploading image to storage', error));
            }
            // image not changed
        } else {
            console.log(`No change to image in db`);
            downloadUrl = req.body.character;
        }

        
        try {
            // Save image url to storage bucket
            const response = await db.collection('characters').doc(req.params.id).update({
            // body in req.body is from the body of the form (the input fields)
                name: req.body.name,
                filmAppearances: Number(req.body.filmAppearances),
                lightsaberColor: req.body.lightsaberColor,
                sideOfForce: req.body.sideOfForce,
                description: req.body.description,
                characterImage: downloadUrl
            });
            res.send(response);
            console.log(response);

        } catch (error) {
            return next(ApiError.internal("Your character request could not be processed at this time", error));
        }
    },


    // DELETE a single document from the database
    async deleteCharacterById(req, res, next) {
        try {
            const characterRef = db.collection('characters').doc(req.params.id);
            const doc = await characterRef.get()

            if (!doc.exists) {
                return next(ApiError.badRequest('The food item you were looking for does not exist'));
            }

            // store downloadURL + obtain the filepath
            const downloadUrl = doc.data().characterImage;
            const filePath = getFilePathFromUrl(downloadUrl);

            // call storage bucket delete function + delete
            const bucketResponse = await deleteFilePathFromBucket(filePath);
            if (bucketResponse) {                
                const response = await characterRef.delete({ exists: true });
                
                res.send(`Item deleted from database${response}`);
            }

        } catch (error) {
            return next(ApiError.internal("Your character request could not be processed at this time", error));
        }
    }
}