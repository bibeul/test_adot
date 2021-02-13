const Joi = require('joi');

module.exports = Joi.array().items(Joi.object({
    name: Joi.string().required(),
    lon: Joi.number().required(),
    lat: Joi.number().required()
}));
