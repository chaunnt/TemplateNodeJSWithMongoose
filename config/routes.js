/**
 * Created by A on 7/18/17.
 */
'use strict';
const AppConfig = require('./app');
const RealEstateRecord = require('../RealEstateRecord/route/RealEstateRecord');
const UserRecord = require('../UserRecord/route/UserRecord');

const listRoute = {
    'RealEstate' : [
        { method: 'POST', path: '/create', config : RealEstateRecord.create},
        { method: 'POST', path: '/list', config : RealEstateRecord.getList},
        { method: 'POST', path: '/listFull', config : RealEstateRecord.getListFull},
        { method: 'POST', path: '/searchById', config : RealEstateRecord.searchById},
        { method: 'POST', path: '/updateById', config : RealEstateRecord.updateById},
        { method: 'POST', path: '/updateByUrl', config : RealEstateRecord.updateByUrl},
        { method: 'POST', path: '/getOtherMeta', config : RealEstateRecord.getOtherMeta},
        { method: 'POST', path: '/getAreaMeta', config : RealEstateRecord.getAreaMeta},
        { method: 'POST', path: '/getLanguageMeta', config : RealEstateRecord.getLanguageMeta},
        { method: 'POST', path: '/getCalculateMeta', config : RealEstateRecord.getCalculateMeta},
    ],
    'UserRecord' : [
        // { method: 'POST', path: '/create', config : UserRecord.create},
        { method: 'POST', path: '/list', config : UserRecord.getList},
        { method: 'POST', path: '/listFull', config : UserRecord.getListFull},
        { method: 'POST', path: '/searchById', config : UserRecord.searchById},
        // { method: 'POST', path: '/updateById', config : UserRecord.updateById},
        // { method: 'POST', path: '/updateByUrl', config : UserRecord.updateByUrl},
        // { method: 'POST', path: '/getOtherMeta', config : UserRecord.getOtherMeta},
        // { method: 'POST', path: '/getAreaMeta', config : UserRecord.getAreaMeta},
        // { method: 'POST', path: '/getLanguageMeta', config : UserRecord.getLanguageMeta},
        // { method: 'POST', path: '/getCalculateMeta', config : UserRecord.getCalculateMeta},
    ],

}

const register = (server, options, next) => {
    try {
        server.auth.strategy('jwt', 'jwt', {
            key: AppConfig.jwt.secret,
            verifyOptions: { algorithms: ['HS256'] }
        });
    } catch(e) {}

    server.route(listRoute[server.realm.plugin]);
    next();
};

const cloneFunc = (func) => {
    var that = func;
    var temp = function temporary() { return that.apply(this, arguments); };
    for(var key in this) {
        if (this.hasOwnProperty(key)) {
            temp[key] = this[key];
        }
    }
    return temp;
}

const createPlugin = () => {
    const plugins = Object.keys(listRoute);

    plugins.forEach((item, key) => {
        const newRegis = cloneFunc(register);
        newRegis.attributes = {
            pkg: {
                name: item
            }
        };
        const pluginTemp = {
            plugin: {
                register: newRegis,
                routes: {
                    prefix: `/${item}`
                }
            }
        };
        plugins[key] = pluginTemp;
    });

    return plugins;
}

module.exports = createPlugin();
