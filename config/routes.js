/**
 * Created by A on 7/18/17.
 */
'use strict';
const Camera = require('../route/Camera');

module.exports = [
    { method: 'POST', path: '/camera/insertMany', config : Camera.insertMany},
    { method: 'POST', path: '/find', config : Camera.find},
    { method: 'POST', path: '/findById', config : Camera.findById},
];
