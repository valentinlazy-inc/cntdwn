const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const timersRouter = require('./routes/timers');
const pushesRouter = require('./routes/pushes');

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.use('/api/timers', timersRouter);
app.use('/api/pushes', pushesRouter);

app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
});

module.exports = app;
