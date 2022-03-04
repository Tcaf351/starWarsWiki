// import express to use router
const router = require('express').Router();

const { auth } = require('firebase-admin');
// import authController
const authController = require('../controller/authController');

module.exports = () => {
    router.post('/register', authController.register);

    router.post('/login', authController.login);

    return router;
};