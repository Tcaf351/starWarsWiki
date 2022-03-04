// import firestore
const { db } = require('../config/db');

module.exports = {
    // CRUD to talk to database for restaurant related queries

    // GET's all users documents from users collection
    async getAllUsers(req, res) {
        try {
            const snapshot = await db.collection('users').get();

            let users = [];

            snapshot.forEach((doc) => {
                users.push({
                    // these are all the collection fields in the database
                    id: doc.id,
                    username: doc.data().name,
                    email: doc.data().email,
                    password: doc.data().password,
                    isAdmin: doc.data().isAdmin,
                });
                console.log(doc.id, `=>`, doc.data())
            });
            
            res.send(users);

        } catch (error) {
            console.log(error);
        }
    },


    // GET user by id
    async getSingleUser(req, res) {
        try {
            const userRef = db.collection('users').doc(req.params.id);
            const doc = await userRef.get()

            if (!doc.exists) {
                console.log('No such document exists');
            } else {
                console.log(doc.data());
            }

        } catch (error) {
            console.log(error);
        }
    },


    // POST user by id
    async postSingleUser(req, res) {
        try {
            const response = await db.collection('users').add({
                username,
                email,
                password,
                isAdmin
            });
            console.log(response.id);
            
        } catch (error) {
            console.log(error);
        }
    },



    // UPDATE user by id
    async putSingleUser(req, res) {
        try {
            const userRef = db.collection('users').doc(req.params.id);
            const res = await userRef.update({
                username: req.body.username,
                email: req.body.emil,
                password: req.body.age,
                isAdmin: req.body.isAdmin
            }); 
            console.log(res)
        } catch (error) {
            console.log(error);
        }
    },


    // DELETE user by id
    async deleteSingleUser(req, res) {
        try {
            const userRef = db.collection('users').doc(req.params.id);
            const res = await userRef.delete({ exists: true });
        } catch (error) {
            console.log(error);
        }
    }
}