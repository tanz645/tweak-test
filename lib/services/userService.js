/**
 * @file User related functions goes here.
 *
 * @author Saidul Islam Bhuiyan Tanzib
 * @since 14 December, 2019
 */

const bcrypt = require('bcryptjs');

const config = require('../../config');

const User = require('../models/user');
const { verifyToken } = require('./tokenService');
/**
 * @param {String} userName
 * @return {Promise<Object>}
 */
const getUserByUserName = (userName) => {
  if (!userName) return Promise.reject({ error: 'No user found' });
  return User.findOne({ userName });
};

/**
 * @param {Object} user
 * @return {Promise<Object>}
 */
const createUser = async (user) => {
  const userData = { ...user };

  if (!user.userName || !user.password) return Promise.reject({ error: 'Can not register user' });

  try {
    const salt = await bcrypt.genSalt(config.adminConfig.user.salt);
    const hash = await bcrypt.hash(user.password, salt);
    userData.password = hash;
    const userInstance = new User(userData);
    const savedUser = await userInstance.save();
    return Promise.resolve(savedUser);
  } catch (e) {
    return Promise.reject({ error: 'Can not register user' });
  }
};

/**
 * @param {Object} loginData
 * @param {Object} userData
 * @return {Promise<Boolean>}
 */
const validateUser = async (loginData, userData) => {
  if (!loginData.userName || !loginData.password) return Promise.reject({ error: 'Can not login' });
  if (!userData.userName || !userData.password) return Promise.reject({ error: 'Can not login' });

  try {
    const match = await bcrypt.compare(loginData.password, userData.password);
    if (match) {
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  } catch (e) {
    return Promise.reject({ error: 'Can not login' });
  }
};

const isAuthorized = async (token) => {
  try {
    const payload = verifyToken(token);
    if (payload && payload.userName) {
      const { userName } = payload;
      const user = await getUserByUserName(userName);
      if (user) {
        return Promise.resolve(payload);
      }
      return Promise.reject('Not authorized');
    }
    return Promise.reject('Not authorized');
  } catch (e) {
    return Promise.reject('Not authorized');
  }
};

module.exports = {
  createUser, getUserByUserName, validateUser, isAuthorized,
};
