// import & initialize firestire
const admin = require('firebase-admin');

try {
    console.log('Attempting connection to database');

    // import service key & credentials
    const serviceAccount = require('./serviceAccountKey.json');

    admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "fullstack-assessment-2.appspot.com"
    });

    console.log('Connected to database');

    const db = admin.firestore();
    const bucket = admin.storage().bucket();

    module.exports = { db, bucket };

} catch (error) {
    console.log(error)
}