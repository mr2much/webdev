const path = require("path");

const __dir = "./db";
const __db = "servidoresxunidadgssd.db";

module.exports = {
  development: { client: "nedb", connection: path.join(__dir, __db) },
};
