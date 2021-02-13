const csv = require('csv-parser');
const fs = require('fs');

const events = [];

fs.createReadStream('../data/events_fixture.csv')
    .pipe(csv())
    .on('data', (row) => {
        events.push({
            lat: row.lat,
            lon: row.lon,
            event_type: row.event_type
        });
    })
    .on('end', () => {
        fs.writeFile('../tests/unit/fixtures/events.json', JSON.stringify(events), 'utf8', (err) => {
            if (err) {
                console.log(`Error writing file: ${err}`);
            } else {
                console.log(`File is written successfully!`);
            }
        });
    });

