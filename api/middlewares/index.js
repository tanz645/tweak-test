/**
 * @file Middlewares for api endpoints.
 *
 * @author Saidul Islam Bhuiyan Tanzib
 * @since 14 December, 2019
 */
const { isAuthorized } = require('../../lib/services/userService');

const checkAuthorization = async (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.status(401).send();
  }
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
    try {
      const user = await isAuthorized(token);
      if (user) {
        req.user = user;
        next();
      } else {
        return res.status(401).send();
      }
    } catch (e) {

    }
  } else {
    return res.status(401).send();
  }
};

module.exports = { checkAuthorization };
