/**
 * Created by bioz on 1/13/2017.
 */
// third party components
const jsonWebToken = require('jsonwebtoken');

// our components
const config = require('../configs/general.config');
const accountService = require('../services/account.service');
const rest = require('../utils/restware.util');

module.exports = function(req, res, next) {
  if (req.method === 'OPTIONS') {
    return rest.sendSuccessOne(res, {}, 200);
  }
  const token = (req.body && req.body.access_token) || req.headers['access_token'] || req.headers['x-access-token'] || (req.query && req.query.access_token);

  if (token) {
    try {
      jsonWebToken.verify(token, config.jwtAuthKey, function(error, decoded) {
        if (error) {
          return rest.sendError(res, 70, 'verify_token_fail', 400, error);
        }
        accountService.verifyAccount(decoded.id, decoded.login_name, function(errorCode, errorMessage, httpCode, errorDescription, result) {
          if (errorCode) {
            return rest.sendError(res, errorCode, errorMessage, httpCode, errorDescription);
          }

          if (req.method === 'GET') {
            req.query.accessAccountId = decoded.id;
            req.query.accessLoginName = decoded.login_name;
          } else {
            req.body.accessAccountId = decoded.id;
            req.body.accessLoginName = decoded.login_name;
          }
          next();
        });
      });
    } catch (error) {
      return rest.sendError(res, 4170, 'authentication_fail', 400, error);
    }
  } else {
    return rest.sendError(res, 4178, 'invalid_token', 400, null);
  }
};
