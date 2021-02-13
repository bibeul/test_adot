const csv = require('csv-parser');
const fs = require('fs');
const events = [];

fs.createReadStream(process.env.EVENTS_FILE)
    .pipe(csv())
    .on('data', (row) => {
        events.push({
            lat: row.lat,
            lon: row.lon,
            event_type: row.event_type
        });
    })
    .on('end', () => {
        console.log('CSV file successfully processed');
    });

const addEvent = (event) => {
    events.push(event);
    fs.appendFileSync(process.env.EVENTS_FILE, `${event.lat},${event.lon},${event.event_type}\n`);
};

const getEvents = () => {
    return events;
};
module.exports = {
    getEvents,
    addEvent
};
