
const config = require('../../config');

const imageValidation = (image) => {
  if(!image.mimetype) return { error: 'Unsupported types' };
  if (!config.adminConfig.image.allowedMimes.includes(image.mimetype)) {
    return { error: 'Unsupported types' };
  }
  if (image.size > config.adminConfig.image.maxFileSize) {
    return { error: 'File too big' };
  }
  return { error: '' };
};

module.exports = { imageValidation };
