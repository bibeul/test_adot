const Joi = require('joi');
const {event_types} = require('../utils/constants');

module.exports = Joi.object({
    event_type: Joi.string().valid(...Object.keys(event_types)).required(),
    lon: Joi.number().required(),
    lat: Joi.number().required()
});
