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
  getOne(server) {
    return new Promise((resolve, reject) => {
      connection.findOne({ server: server.server }, function (err, doc) {
        if (err) {
          reject(err);
        }

        resolve(doc);
      });
    });
  },
  create(server) {
    return new Promise(async (resolve, reject) => {
      const res = await this.getOne(server);

      // if res is not null it means the entry exists
      if (res) {
        const error = new Error(`${server.server} already exists!`);
        reject(error);
      } else {
        // save entry to DB
        connection.insert(server, (err, newDoc) => {
          if (err) {
            reject(err);
          }

          resolve(newDoc);
        });
      }
    });
  },
};
