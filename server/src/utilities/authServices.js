const { db } = require('../config/db');
const config = require('../config/config');

// import modules
const bcrypt = require('bcrypt');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const { token } = require('morgan');


module.exports = {
    async findUser(email) {
        // set DB variables and then call them
        const response = await db.collection('users').get();

        let users = [];
        response.forEach((doc) => {
            users.push({
                id: doc.id,
                username: doc.data().username,
                email: doc.data().email,
                password: doc.data().password,
                isAdmin: doc.data().isAdmin
            });
        })
        console.log(email)

        // match query
        const matchingUser = users.filter(user => email === user.email);
        console.log(matchingUser);
        console.log(matchingUser.length);

        return matchingUser;
    },


    async hashPassword(password) {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        return hashPassword;
    },


    async comparePassword(user, password) {
        // retrieve the hashed password in db
        const hashPassword = user[0].password;

        // compare password passed in with db hashpassword via bcrypt
        const passwordMatch = await bcrypt.compare(password, hashPassword);
        

        return passwordMatch;
    },


    async userDetailsToJSON(id) {
        // Call new registered user data
        const user = await db.collection('users').doc(id).get();

        // convert data to json
        const userJSON = _.omit(
            { id: id, ...user.data() },
            'password'
        );
        console.log(userJSON)
        return userJSON;
    },


    jwtSignUser(user) {
        // firstly need to declare variables for generation of the token
        const payload = user;
        const secret = config.authentication.jwtSecret;
        const tokenExpireTime = 60 * 60 * 24;

        // generate token
        const token = jwt.sign(payload, secret, { expiresIn: tokenExpireTime });

        return token;
    }
};