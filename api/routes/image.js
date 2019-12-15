/**
 * @file Endpoints for image related service.
 *
 * @author Saidul Islam Bhuiyan Tanzib
 * @since 14 December, 2019
 */

const express = require('express');
const upload = require('../../lib/utils/multerSetup');
const { checkAuthorization } = require('../middlewares');
const { uploadController, getImageController } = require('../controllers/imageController');
const { imageValidation } = require('../validators/imageValidator');

const router = express.Router();

router.post('/image/upload', checkAuthorization, upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).send('No file provided');
  const valid = imageValidation(req.file);
  if (valid.error) return res.status(400).send(valid.error);
  try {
    await uploadController(req.file);
    return res.status(200).send('uploaded');
  } catch (e) {
    return res.status(500).send('Upload unsuccessful');
  }
});

router.get('/image/', checkAuthorization, async (req, res) => {
  if (!req.query.fileName) return res.status(400).send('No file name provided');
  try {
    const result = await getImageController(req.query.fileName);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).send('can not get image');
  }
});
module.exports = router;
