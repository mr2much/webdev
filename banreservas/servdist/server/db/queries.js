const connection = require("./connection");

module.exports = {
  getAll() {
    return new Promise((resolve, reject) => {
      connection.find({}, (err, entries) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(entries);
      });
    });
  },
  findByID(id) {
    return new Promise((resolve, reject) => {
      connection.findOne({ _id: id }, function (err, doc) {
        if (err) {
          reject(err);
          return;
        }

        resolve(doc);
      });
    });
  },
  update(id, server) {
    server.last_modified = Date.now();
    return new Promise(async (resolve, reject) => {
      connection.update(
        { _id: id },
        { $set: server },
        {},
        async (err, numReplaced) => {
          if (err) {
            reject(err);
            return;
          }

          connection.loadDatabase();
          resolve(server);
        }
      );
    });
  },
  getOne(server) {
    return new Promise((resolve, reject) => {
      connection.findOne({ server: server.server }, function (err, doc) {
        if (err) {
          reject(err);
          return;
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
        return;
      } else {
        // save entry to DB
        connection.insert(server, (err, newDoc) => {
          if (err) {
            reject(err);
            return;
          }

          resolve(newDoc);
        });
      }
    });
  },
};
