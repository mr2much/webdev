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
      console.log("Received a request to create an entry");

      const res = await this.getOne(server);

      // if res is not null it means the entry exists
      if (res) {
        const error = `${server.server} already exists!`;
        reject(error);
      } else {
        // save entry to DB
        // connection.insert(server, (err, newDoc) => {
        //   if(err) {
        //     reject(err);
        //   }
        // });
        console.log(server);
        console.log("Saved correctly");
      }

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
