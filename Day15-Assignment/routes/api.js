const express = require('express');
const authRouter = require('./auth');
const doctorRouter = require('./doctor');
const reportRouter = require('./report');

const app = express();

app.use('/auth/', authRouter);
app.use('/doctor/', doctorRouter);
app.use('/report/', reportRouter);

module.exports = app;
