const fs = require('fs');
const Service = require('../../services/interests');
const Distance = require('../../utils/distance');
const eventRepositoryMock = require('./mocks/eventRepository.mock');
const interestPoints =  JSON.parse(fs.readFileSync('data/points-of-interest.json'));
const eventRepository = require('../../repository/eventRepository');

const event = {
    lat: 48,
    lon: 2.8,
    event_type: "click"
};

test('addEvent should call addEvent from repository once', () => {
    const addEventStub = jest.spyOn(eventRepository, 'addEvent').mockImplementation(() => {});
    Service.addEvent(event);

    expect(addEventStub).toHaveBeenCalled();
});

test('linkEventToInterest should call getEvent from repository once', async () => {
    const getEventsStub = jest.spyOn(eventRepository, 'getEvents').mockImplementation(eventRepositoryMock.getEvents);
    const checkClosestPositionSpy = jest.spyOn(Distance, 'checkClosestPosition');
    await Service.linkEventToInterest(interestPoints);

    expect(getEventsStub).toHaveBeenCalled();
    getEventsStub.mockRestore();
    checkClosestPositionSpy.mockRestore();
});

test('linkEventToInterest should call checkClosestPosition from distance utils module 200times', async () => {
    const getEventsStub = jest.spyOn(eventRepository, 'getEvents').mockImplementation(eventRepositoryMock.getEvents);
    const checkClosestPositionSpy = jest.spyOn(Distance, "checkClosestPosition");
    await Service.linkEventToInterest(interestPoints);

    expect(getEventsStub).toHaveBeenCalled();
    expect(checkClosestPositionSpy).toBeCalledTimes(200);
    getEventsStub.mockRestore();
    checkClosestPositionSpy.mockRestore();
});

test('should total event be 200 after linkEventToInterest', async () => {
    const getEventsStub = jest.spyOn(eventRepository, 'getEvents').mockImplementation(eventRepositoryMock.getEvents);
    const result = await Service.linkEventToInterest(interestPoints);
    const values = Object.values(result);

    let totalEvents = 0;
    for(let i = 0; i < values.length; i++){
        totalEvents += values[i].clicks + values[i].impressions;
    }
    expect(getEventsStub).toHaveBeenCalled();
    expect(totalEvents).toBe(200);
    getEventsStub.mockRestore();
});
