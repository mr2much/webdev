const connection = require("./connection");

module.exports = {
  getAll() {
    return new Promise((resolve, reject) => {
      connection.find({}, (err, entries) => {
        if (err) {
          reject(err);
        }

        resolve(entries);
      });
    });
  },
  getOne(id) {
    return new Promise((resolve, reject) => {
      connection.findOne({ _id: id }, function (err, doc) {
        if (err) {
          reject(err);
        }

        resolve(doc);
      });
    });
  },
};
