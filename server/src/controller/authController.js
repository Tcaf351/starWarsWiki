const { db } = require('../config/db');
const ApiError = require('../utilities/ApiError');
const { findUser, hashPassword, comparePassword, userDetailsToJSON, jwtSignUser } = require('../utilities/authServices');

module.exports = {
    // Register (POST)
    async register(req, res, next) {
        try {
            console.log(req.body);
            const { username, email, password } = req.body;


            // block matching user, unique email address must be used
            const matchingUser = await findUser(email);
            if (matchingUser.length > 0) {
                console.log('email duplicate error')
                return next(ApiError.badRequest('This email is already in use'));
            }


            // save a new user to the db
            const response = await db.collection('users').add({
                username: username, // value username is from destructured req.body on line 9
                email: email,
                password: await hashPassword(password),
                isAdmin: false 
            });


            // confirm registration + convert user details to json
            console.log(`Success - User ${response.id} registered`);
            const userJSON = await userDetailsToJSON(response.id);

            res.send({
                user: userJSON,
                token: jwtSignUser(userJSON)
            });


        } catch (error) {
            return next(ApiError.internal("Your user profile could not be registered", error));
        }
    },


    // Login (POST only to server)
    async login(req, res, next) {
        try {
            const { email, password } = req.body;

            // validation to block user emails that don't match
            const matchingUser = await findUser(email);
            if (matchingUser.length === 0) {
                return next(ApiError.badRequest('The credentials entered are incorrect (debug: email)'));
            }


            // validation to block user passwords that don't match
            const passwordMatch = await comparePassword(matchingUser, password);
            if (!passwordMatch) {
                return next(ApiError.badRequest('The credentials entered are incorrect (debug: password)'));
            }

            // confirm login & convert user details to json
            console.log(`Success - User ${matchingUser[0].id} is logged in`);
            const userJSON = await userDetailsToJSON(matchingUser[0].id);

            res.send({
                user: userJSON,
                token: jwtSignUser(userJSON)
            });


        } catch (error) {
            return next(ApiError.internal("Your user profile could not be logged in", error));
        }
    }
};