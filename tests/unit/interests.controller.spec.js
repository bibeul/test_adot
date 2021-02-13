const fs = require('fs');
const Service = require('../../services/interests');
const Controller = require('../../controllers/interests');
const res = {
    body: {},
    json: jest.fn(() => ({
        end: jest.fn(),
    }))
};
test('should call eventToInterest once', async () => {
    const linkEventToInterestSpy = jest.spyOn(Service, 'linkEventToInterest')
        .mockImplementation(() => new Promise(resolve => resolve()));

    await Controller.eventToInterest({}, res);

    expect(linkEventToInterestSpy).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled()

    linkEventToInterestSpy.mockRestore();
});

test('should call addEvent once', () => {
    const addEventSpy = jest.spyOn(Service, 'addEvent').mockImplementation(() => {});

    Controller.addEvent({}, res);

    expect(addEventSpy).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();

    addEventSpy.mockRestore();
});
