// create server-side validation
const Joi = require('joi');
const ApiError = require('../utilities/ApiError');

module.exports = {
    validateCharacter(req, res, next) {
        // console.log(req.body)
        // using next will pass it through validation to the controller
        const schema = Joi.object({
            name: Joi.string().min(3).max(50).required(),
            lightsaberColor: Joi.string().min(2).max(25).required(),
            sideOfForce: Joi.string().min(2).max(25).required(),
            description: Joi.string().min(2).max(500).required(),
            filmAppearance: Joi.number().required(),
            characterImage: Joi.string(),
            filePath: Joi.string(),
        });

        // return 1 of 2 values
        const { error, value} = schema.validate(req.body);

        // Sets responses for error & success
        if (error) {
            switch(error.details[0].context.key) {
                case 'name': 
                    next(ApiError.badRequest('You must provide a valid character name'))
                    break

                case 'lightsaberColor': 
                    next(ApiError.badRequest('You must provide a valid lightsaber colour for the character'))
                    break

                case 'sideOfForce': 
                    next(ApiError.badRequest('You must provide a valid side for the character'))
                    break

                case 'description': 
                    next(ApiError.badRequest('You must provide a valid description for the character'))
                    break

                case 'filmAppearance': 
                    next(ApiError.badRequest('You must provide a valid film appearance location'))
                    break
                
                case 'characterImage':
                    next(ApiError.badRequest('You must provide a valid character image'))
                    break

                default:
                    next(ApiError.badRequest('Invalid form information - please check your form information and try again'))
            }
        } else {
            next(); 
        }
    }
};