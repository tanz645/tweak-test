/**
 * @file Controllers for user routes.
 *
 * @author Saidul Islam Bhuiyan Tanzib
 * @since 14 December, 2019
 */

const { uploadImage, getImage, storeImageMetaData } = require('../../lib/services/imageService');
/**
 * @param {Object} image
 * @return {Promise<Object>}
 */
const uploadController = async (image) => {
  try {
    const result = await uploadImage(image);
    storeImageMetaData(image)
    return Promise.resolve(result);
  } catch (e) {
    return Promise.reject('Upload unsuccessful');
  }
};

/**
 * @param {String} imageName
 * @return {Promise<Object>}
 */
const getImageController = async (imageName) => {
  try {
    const result = await getImage(imageName);
    return Promise.resolve(result);
  } catch (e) {
    return Promise.reject('Can not get image');
  }
}

module.exports = { uploadController, getImageController };
