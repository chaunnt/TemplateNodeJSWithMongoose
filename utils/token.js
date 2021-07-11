/**
* Created by A on 7/18/17.
*/
'use strict';
const jwt       = require('jsonwebtoken');
const AppConfig = require('../config/app');

function createProjectToken(projectData, expire = null) {
  // Sign the JWT
  const hash = {
    algorithm: 'HS256',
    expiresIn: expire || '60 days',
  }

  return jwt.sign(projectData, AppConfig.jwt.secret, hash);
}

function createToken(data, expire = null) {
  const hash = {
    algorithm: 'HS256',
    expiresIn: expire || AppConfig.jwt.expiresIn,
  }

  return jwt.sign(data, AppConfig.jwt.secret, hash);
}

function verifyToken(token) {
  return jwt.verify(token, AppConfig.jwt.secret);
}

module.exports = {
  createToken,
  verifyToken,
  createProjectToken
};
