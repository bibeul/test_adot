const interestService = require('../services/interests');

const eventToInterest = async function(req, res) {
    const result = await interestService.linkEventToInterest(req.body).then(res => res);
    res.json(result).end();
};

const addEvent = function(req, res) {
    const result =  interestService.addEvent(req.body);
    res.json(result).end();
};

module.exports = {
    eventToInterest,
    addEvent
};
