/* eslint-disable linebreak-style */
const environment = process.env.NODE_ENV || 'development';
const Datastore = require('nedb');
const config = require('../db_connections');

const envieronmentConfig = config[environment];
const connection = new Datastore(envieronmentConfig);

module.exports = connection;
