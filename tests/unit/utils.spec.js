const Distance = require('../../utils/distance');
const fs = require('fs');

const interestPoints =  JSON.parse(fs.readFileSync('data/points-of-interest.json'));

test('distance between point should be close to 6.909', () => {
    const lat1 = 48;
    const lon1 = 2.8;
    const lat2 = 47.9;
    const lon2 = 2.8001;

    expect(Distance.distance(lat1, lon1, lat2, lon2)).toBeCloseTo(6.909, 3);
});

test('distance between point should be 0', () => {
    const lat = 48;
    const lon = 2.8;

    expect(Distance.distance(lat, lon, lat, lon)).toBe(0);
});

test('Closest interest point should be 1', () => {
    const event = {
      lat: 48,
      lon: 2.8,
      event_type: "imp"
    };

    expect(Distance.checkClosestPosition(interestPoints, event)).toBe(1);
});

test('distance between point should be 0', () => {
    const event = {
        lat: 48.87,
        lon: 2.348,
        event_type: "imp"
    };

    expect(Distance.checkClosestPosition(interestPoints, event)).toBe(0);
});
