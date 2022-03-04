// import express to use router
const router = require('express').Router();

// bring in controllers
const characterController = require('../controller/characterController');

// bring in policies
const characterPolicy = require('../policies/characterPolicy');


// Restaurants Page
module.exports = () => {
    router.get('/characters', characterController.getAllCharacters);

    router.get('/characters/:id', characterController.getCharacterById);

    // using next in the policy will pass the validation to the controller
    router.post('/characters', characterController.postCharacterById);

    router.put('/characters/:id', characterController.putCharacterById);

    router.delete('/characters/:id', characterController.deleteCharacterById);

    return router;
};