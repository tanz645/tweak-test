/**
 * Validate requests of user.
 *
 * @author Saidul Islam Bhuiyan Tanzib
 * @since December 14, 2019
 *
 */

const Joi = require('@hapi/joi');


/**
 * @param {Object} body - request body
 * @return {Object} - validation response
 */
const validateUserRegistration = (data) => {
  const schema = Joi.object({
    userName: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),
    password: Joi.string()
      .pattern(/^[a-zA-Z0-9]{3,30}$/).required(),
    repeatPassword: Joi.ref('password'),
  }).with('password', 'repeatPassword');

  return schema.validate(data);
};

const validateUserLogin = (data) => {
  const schema = Joi.object({
    userName: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),
    password: Joi.string()
      .pattern(/^[a-zA-Z0-9]{3,30}$/).required(),
  });

  return schema.validate(data);
}

module.exports = { validateUserRegistration, validateUserLogin };
