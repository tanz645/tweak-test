/**
 * @file Token related methods.
 *
 * @author Saidul Islam Bhuiyan Tanzib
 * @since 14 December, 2019
 */
const fs = require('fs');
const jwt = require('jsonwebtoken');
const config = require('../../config');

const privateKEY = fs.readFileSync('./crypto/private.key', 'utf8');
const publicKEY = fs.readFileSync('./crypto/public.key', 'utf8');

/**
 * @param {Object} user
 * @return {String}
 */
const getToken = (user) => {
  const payload = {
    userName: user.userName,
  };

  const signOptions = config.adminConfig.user.jwt;

  const token = jwt.sign(payload, privateKEY, signOptions);

  return `Bearer ${token}`;
};

/**
 * @param {String} token
 * @return {Object}
 */
const verifyToken = (token) => {
  const signOptions = config.adminConfig.user.jwt;

  const result = jwt.verify(token, publicKEY, signOptions);

  return result;
};

module.exports = { getToken, verifyToken };
