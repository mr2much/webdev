/* eslint-disable consistent-return */
/* eslint-disable linebreak-style */
const db = require('./connections');

db.loadDatabase();

module.exports = {
  getAll() {
    db.find({}, (err, data) => {
      if (err) {
        // next(err);
        return;
      }

      return data;
    });
  },
};
