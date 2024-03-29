﻿require('rootpath')();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('api/_middleware/error-handler');
require('dotenv').config();



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// allow cors requests from any origin and with credentials
app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));

// api routes
app.use('/accounts', require('api/accounts/accounts.controller'));

app.use('/news', require('api/news/news.controller'));

// swagger docs route
app.use('/', require('api/_helpers/swagger'));

// global error handler
app.use(errorHandler);

//exports this for tests (needs to export the entire app so tests can launch on multiple ports.)
module.exports = app