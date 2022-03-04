// Inset Upload Image Utility Here
const { bucket } = require('../config/db');
const uuid = require('uuid');
const path = require('path');
const fs = require('fs');

module.exports = {
    fileServerUpload(file) {
        console.log('1')
        console.log(file);

        // Here you create a unique file name
        const fileName = Date.now() + '_' + file.name;
        console.log(`Unique Filename: ${fileName}`);

        // Then you need to declare server storage file path
        const filePath = path.join(
            __dirname,
            '../../',
            `/public/uploads/${fileName}`
        );

        file.mv(filePath);
        console.log(`Server uploaded file path: ${filePath}`);

        console.log('2')

        return fileName;
    },

    async storageBucketUpload(fileName) {
        console.log(`File Name: ${fileName}`);
        console.log('3')


        // 1. generate random token using uuid. Never log the storage token when going into production
        const storageToken = uuid.v4();

        // 2. Declare filepath & options
        const filePath = `./public/uploads/${fileName}`;
        console.log(filePath);
        const destFileName = fileName;

        const options = {
            destination: destFileName,
            resumable: true,
            validation: 'crc32c',
            metadata: {
                metadata: {
                    firebaseStorageDownloadTokens: storageToken
                },
            }
        };
        console.log('4')


        // 3. Call firebase image upload function to save storage bucket
        const result = await bucket.upload(filePath, options);

        // 4. Obtain storage bucket name from our upload result
        const bucketName = result[0].metadata.bucket;
        console.log(`Bucket Name: ${bucketName}`);

        // 5. Construct the dynamic URL
        const downloadUrl = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${fileName}?alt=media&token=${storageToken}`;

        // Delete the file from the temp server location after the bucket upload
        fs.unlink(filePath, error => {
                if (error) {
                    return ({
                        message: 'Error occured in removing file from temporary local storage'
                    });
                } else {
                    console.log('File in temporary local storage deleted');
                }
            }
        );
            console.log(`download url for database ${downloadUrl}`);
        return downloadUrl;
    },

    getFilePathFromUrl(downloadUrl) {
        console.log('6')

        console.log(`Downloaded from DB: ${downloadUrl}`);

        const baseUrl = `https://firebasestorage.googleapis.com/v0/b/fullstack-assessment-2.appspot.com/o/`;
        let filePath = downloadUrl.replace(baseUrl, "");

        const indexOfEndPath = filePath.indexOf("?");
        filePath = filePath.substring(0, indexOfEndPath);

        console.log(`File in bucket for deletion: ${filePath}`);
        console.log('7')

        return filePath;
    },

    async deleteFilePathFromBucket(filePath) {
        // check file exists in storage
        const file = bucket.file(filePath);
        const fileChecker = await file.exists();

        if (fileChecker[0] === false) {
            const options = {
                ignoreNotFound: false,
            };

            const data = await file.delete(options);
            console.log(`The file does not exist in storage: ${filePath}`);
            return data[0];

        } else {
            const data = await file.delete();
            console.log(`File deleted from storage bucket: ${filePath}`);

            return data[0];
        }
    },

    validateFile(file, maxSize) {
        console.log(file);
        // 1. check that file exists
        if (file === null) {
            return({
                message: 'No file uploaded'
            });
        }

        // 2. check if the file size is too large for set file size
        if (file.characterImage.size > maxSize) {
            return({
                message: 'The file is too large - Please try again'
            });
        }

        // 3. restrict what file types can be accepted
        let ext = file.characterImage.name;
        ext = ext.split('.').pop();
        ext = ext.toLowerCase();
        console.log(ext);

        // check for restrictions against declared variable strings
        if (!(ext == "png" || ext == "jpeg" || ext == "jpg" || ext == "gif")) {
            return ({
                message: 'Please upload an accepted image file type'
            });
        }
    }
};