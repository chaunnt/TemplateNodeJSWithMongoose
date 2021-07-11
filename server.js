/**
 * Created by A on 7/18/17.
 */
'use strict'
const Logger    = require('./utils/logging');
const Glue      = require('glue');
const Manifest  = require('./config/manifest');
const Redis     = require('./ThirdParty/Redis/RedisInstance');

Glue.compose(Manifest, {relativeTo: __dirname}, (err, server) => {
    if (err) {
        throw err;
    }
    server.start(() => {
        Logger.info('Server running at:', server.info.uri);

        Redis.initRedis().then(() => {
        //     Kue.init();
        });
    });
});
