const fs = require('fs');

const getEvents = () => {
    return JSON.parse(fs.readFileSync('tests/unit/fixtures/events.json'));
};
module.exports = {
    getEvents
};
