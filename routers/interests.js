const interestController = require('../controllers/interests');
const express = require('express');
const eventToInterestValidation = require('../validations/eventToInterest');
const addEvent = require('../validations/addEvent');
const validator = require('../validations/validator');
const router = express.Router();

router.post('/', validator(eventToInterestValidation), interestController.eventToInterest);
router.post('/add-event', validator(addEvent), interestController.addEvent);

module.exports = router;
