
require('dotenv').config();

const adminConfig = require('./admin');

module.exports = {
  mongo: {
    host: process.env.MONGO_HOST || 'localhost',
    port: process.env.MONGO_PORT || '27017',
    user: process.env.MONGO_USER || 'tanzib',
    pass: process.env.MONGO_PASS || '',
    database: process.env.MONGO_DB || 'tweak',
  },
  aws: {
    ID: process.env.AWS_ID,
    secret: process.env.AWS_SECRET,
    bucket: process.env.AWS_BUCKET,
  },
  adminConfig,
}
