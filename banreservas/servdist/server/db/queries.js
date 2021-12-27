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
  create(server) {
    return new Promise(async (resolve, reject) => {
      console.log("Received a request to create an entry");

      const res = await this.getOne(server.id);

      console.log(res);

      // this.getOne({ server: data.server }, (err, server) => {
      //   if (err) {
      //     console.log("Error");
      //     res.json({ success: false, statusCode: 500, message: err });
      //     res.end();
      //     return;
      //   }

      //   if (server) {
      //     res.json({ success: false, message: "duplicated" });
      //   } else {
      //     database.insert(data, (err, newDoc) => {
      //       if (err) {
      //         res.json({ success: false, statusCode: 500, message: err });
      //         res.end();
      //         return;
      //       }

      //       res.json(newDoc);
      //     });
      //   }
      // });
    });
  },
};
