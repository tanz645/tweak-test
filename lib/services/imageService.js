/**
 * @file User related functions goes here.
 *
 * @author Saidul Islam Bhuiyan Tanzib
 * @since 14 December, 2019
 */


const fs = require('fs');
const { exiftool } = require('exiftool-vendored');
const config = require('../../config');
const s3 = require('../clients/awss3');
const Image = require('../models/image');

/**
 * @param {Object} image
 * @return {Promise<Object>}
 */
const uploadImage = async (image) => {
  const params = {
    Bucket: config.aws.bucket,
    Key: image.originalname, // File name you want to save as in S3
    Body: image.buffer,
  };

  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) {
        reject('can not upload');
      }
      resolve(data);
    });
  });
};

/**
 * @param {String} imageName
 * @return {Promise<Object>}
 */
const getImage = async (imageName) => {
  const params = {
    Bucket: config.aws.bucket,
    Key: imageName,
  };

  return new Promise((resolve, reject) => {
    s3.getObject(params, (err, data) => {
      if (err) {
        reject('Can not get image');
      }
      resolve(data);
    });
  });
};

/**
 * @param {Object} image
 * @return {Promise<Object>}
 */
const storeImageMetaData = (image) => new Promise((resolve, reject) => {
  fs.writeFile(`tmp/${image.originalname}`, image.buffer, 'binary', async (err) => {
    if (!err) {
      try {
        const res = await exiftool.read(`tmp/${image.originalname}`);

        exiftool.end();
        fs.unlinkSync(`tmp/${image.originalname}`);

        const resToString = JSON.stringify(res);
        const data = {
          name: image.originalname,
          meta: resToString,
        };
        const imageInstance = new Image(data);
        await imageInstance.save();
        resolve(1);
      } catch (e) {
        resolve(0);
      }
    } else {
      resolve(0);
    }
  });
});

module.exports = { uploadImage, getImage, storeImageMetaData };
