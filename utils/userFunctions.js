/**
 * Created by A on 7/18/17.
 */
'use strict';

const Boom      = require('boom');
const DB        = require('../config/database').DB;
const bcrypt    = require('bcrypt');
const Logger    = require('./logging');

function verifyUniqueUser(req, res) {
    // Find an entry from the database that
    // matches either the email or username
    DB('users').where('email' ,req.payload.email).orWhere({username:  req.payload.username}).then(results=>{
        // Check whether the username or email
        // is already taken and error out if so
        if (results.length > 0) {
            if (results[0].username === req.payload.username || results[0].email === req.payload.email) {
                res(Boom.badRequest('Username or Email taken'));
            }

        }
        else res(req.payload);
        // If everything checks out, send the payload through
        // to the route handler

    }).catch(err=>{
        Logger.error(err);
        res(err);
    })

}

function verifyCredentials(req, res) {
    const password = req.payload.password;

    // Find an entry from the database that
    // matches either the email or username
    console.log(req.payload)
    DB('users').where('email' ,req.payload.email || '').orWhere({username:  req.payload.username}).then(results=>{
        if (results) {
            bcrypt.compare(password, results[0].password, (err, isValid) => {
                if(err) res(err);
                if (isValid) {
                    res(results[0]);
                }
                else {
                    res(Boom.badRequest('Incorrect password!'));
                }
            });
        } else {
            res(Boom.badRequest('Incorrect username or email!'));
        }
    }).catch(err=>{
        Logger.error(err);
        res(err);
    })

}

module.exports = {
    verifyUniqueUser: verifyUniqueUser,
    verifyCredentials: verifyCredentials
}