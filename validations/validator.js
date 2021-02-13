module.exports = function(schema) {
    return function(req, res, next) {
        const options = {
            abortEarly: true,
            allowUnknown: true,
            stripUnknown: true
        };

        const { error, value } = schema.validate(req.body, options);

        if (error) {
            console.log(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
            res.status(400).end(JSON.stringify(error.details))
        } else {
            req.body = value;
            next();
        }
    }
};
