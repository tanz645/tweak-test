/**
 * @file Entry file
 *
 * @author Saidul Islam Bhuiyan Tanzib
 * @since 14 December, 2019
 */
const serverless = require('serverless-http');
require('./lib/clients/mongo')();
const app = require('./app');
// app.listen(3000)
module.exports.handler = serverless(app);
