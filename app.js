const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const apiRouter = require('./router/api.router');
const { DB_URL: { DB_URL } } = require('./constants');

const app = express();

_connectDB();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/', apiRouter);

app.listen(5000, () => {
    console.log('App listen 5000');
});

function _connectDB() {
    mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

    const { connection } = mongoose;

    connection.on('error', (err) => {
        console.log(err);
    });
}
