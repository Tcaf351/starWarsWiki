// import express to use router
const router = require('express').Router();

// import routes
const characterRoutes = require('./characterRoutes');
const authRoutes = require('./authRoutes');

// Controllers
const characterController = require('../controller/characterController');


module.exports = () => {

    // Home Page
    router.get('/', (req, res, next) => {
        res.send('hello world')
    });

    // sub-routes
    router.use('/', characterRoutes());
    router.use('/auth', authRoutes());

    return router
}