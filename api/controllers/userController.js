/**
 * @file Controllers for user routes.
 *
 * @author Saidul Islam Bhuiyan Tanzib
 * @since 14 December, 2019
 */

const { createUser, getUserByUserName, validateUser } = require('../../lib/services/userService');
const { getToken } = require('../../lib/services/tokenService');

/**
 * @param {Object} newUser - request body
 * @return {Promise<Object>}
 */
const registerUserController = async (newUser) => {
  if (!newUser.userName || !newUser.password) {
    return Promise.reject({ status: 400, msg: 'Invalid request' });
  }
  try {
    const checkUser = await getUserByUserName(newUser.userName);
    if (checkUser) {
      return Promise.reject({ status: 400, msg: 'Username already exists' });
    }
    await createUser(newUser);
    return Promise.resolve({ status: 200, msg: 'User Saved' });
  } catch (e) {
    return Promise.reject({ status: 500, msg: e });
  }
};

/**
 * @param {Object} newUser - request body
 * @return {Promise<Object>}
 */
const loginController = async (loginData) => {
  if (!loginData.userName || !loginData.password) {
    return Promise.reject({ status: 400, msg: 'Invalid request' });
  }
  try {
    const checkUser = await getUserByUserName(loginData.userName);
    if (checkUser) {
      const isValid = await validateUser(loginData, checkUser);
      if (isValid) {
        const token = getToken(checkUser);
        return Promise.resolve({ status: 200, msg: token });
      }
      return Promise.resolve({ status: 400, msg: 'Username or password incorrect' });
    }
    return Promise.reject({ status: 400, msg: 'Username or password incorrect' });
  } catch (e) {
    return Promise.reject({ status: 500, msg: 'Can not login' });
  }
};

module.exports = { registerUserController, loginController };
