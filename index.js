require('dotenv').config();
const express = require('express');
const interests = require('./routers/interests');
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use('/interest', interests);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`listening at ${process.env.API_URL}:${port}`);
});
