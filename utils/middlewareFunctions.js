'use strict';
require("dotenv").config();

const Boom      = require('boom');
const msg       = require('../config/constant').messages;
const verifyToken = require('./token').verifyToken;

const _getProjectInfo = (authorization) => {
    let result = {
        error: false,
        data: {}
    };
    if (!authorization) {
        result.error = true;
        result.data = Boom.unauthorized(msg.unauthorized.content);
    } else {
        const token = authorization.split(/\s+/).pop() || null;
        if (!token) {
            result.error = true;
            result.data = Boom.unauthorized(msg.unauthorized.content);
        } else {
            result.error = false;
            result.data = verifyToken(token);
        }
    }
    return result;
}

const verifyPermission = (req, res) => {
    const authorization = req.headers.authorization;
    let projectInfo = _getProjectInfo(authorization);
    if (projectInfo.error === false) {
        //TODO: verify Token later
        res(projectInfo.data);
    } else {
        res(Boom.unauthorized(msg.unauthorized.content));
    }
}

const verifySuperAdminPermission = (req, res) => {
    console.log("verifySuperAdminPermission");
    const authorization = req.headers.authorization;
    if (authorization && authorization === process.env.SUPER_ADMIN_KEY){
        res();
    } else {
        res(Boom.unauthorized(msg.unauthorized.content));
    }
}

module.exports = {
    verifyPermission,
    verifySuperAdminPermission,
}
