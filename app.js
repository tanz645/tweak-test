/**
 * @file App config file
 *
 * @author Saidul Islam Bhuiyan Tanzib
 * @since 14 December, 2019
 */

const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();


/**
 * @see https://helmetjs.github.io/
 */
app.use(helmet());

app.use(morgan('combined'));
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const users = require('./api/routes/user');
const images = require('./api/routes/image');

app.use('/', users);
app.use('/', images);

module.exports = app;
