/* eslint-disable linebreak-style */
const environment = process.env.NODE_ENV || 'development';
const Datastore = require('nedb');
const config = require('../../db_connections');

const environmentConfig = config[environment];
const ds = new Datastore(environmentConfig.connection);

module.exports = ds;
