/**
 * @file Endpoints for user related service.
 *
 * @author Saidul Islam Bhuiyan Tanzib
 * @since 14 December, 2019
 */

const express = require('express');

const router = express.Router();

const { validateUserRegistration, validateUserLogin } = require('../validators/userValidation');
const { registerUserController, loginController } = require('../controllers/userController');

router.post('/user/register', async (req, res) => {
  const validate = await validateUserRegistration(req.body);
  if (validate.error) {
    return res.status(400).send(validate.error.details[0].message);
  }
  try {
    const result = await registerUserController(validate.value);
    return res.status(result.status || 200).send(result.msg);
  } catch (e) {
    return res.status(e.status || 400).send(e.msg);
  }
});

router.post('/user/login', async (req, res) => {
  const validate = await validateUserLogin(req.body);
  if (validate.error) {
    return res.status(400).send(validate.error.details[0].message);
  }
  try {
    const result = await loginController(validate.value);
    return res.status(result.status).send(result.msg);
  } catch (e) {
    return res.status(e.status || 400).send(e.msg);
  }
});

module.exports = router;
