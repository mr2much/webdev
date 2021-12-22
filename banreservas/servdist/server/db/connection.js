const Datastore = require("nedb");

const environment = process.env.NODE_ENV || "development";
const config = require("../nedbfile");
const environmentConfig = config[environment];

const connection = new Datastore({
  filename: environmentConfig.connection,
  autoload: true,
});

module.exports = connection;
