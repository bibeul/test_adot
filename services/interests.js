const eventRepository = require('../repository/eventRepository');
const {event_types} = require('../utils/constants');
const Distance = require('../utils/distance');

const linkEventToInterest = function(interestPoints) {
    return new Promise((resolve,reject) => {
        const events = eventRepository.getEvents();
        const start = new Date();
        const result = {};
        for (let i = 0; i < interestPoints.length; i++) {
            result[interestPoints[i].name] = {
                lat: interestPoints[i].lat,
                lon: interestPoints[i].lon,
                name: interestPoints[i].name,
                clicks: 0,
                impressions: 0,
            }
        }
        for (let i = 0; i < events.length; i++) {
            const event_type = event_types[events[i].event_type];
            const closestPointIndex = Distance.checkClosestPosition(interestPoints, events[i]);
            const closestInterestPointName = interestPoints[closestPointIndex].name;
            result[closestInterestPointName][event_type]++;
        }
        const afterFormat = new Date();
        console.log("format time : " + (afterFormat - start));
        resolve(result);
    });
};

const addEvent = function(event) {
    eventRepository.addEvent(event);
};

module.exports = {
    linkEventToInterest,
    addEvent
};
