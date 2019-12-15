const Aws = require('aws-sdk');

const config = require('../../config');

const s3 = new Aws.S3({
  accessKeyId: config.aws.ID,
  secretAccessKey: config.aws.secret,
});

module.exports = s3;
