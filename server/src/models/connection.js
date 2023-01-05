const { MongoClient } = require("mongodb");
require("dotenv").config();

let dbConnection;

const url = `${process.env.MONGODB_URL}/vehicles`;

module.exports = {
  connectToDB: (cb) => {
    MongoClient.connect(url)
      .then((client) => {
        dbConnection = client.db();
        return cb();
      })
      .catch((err) => {
        console.log(err);
        return cb(err);
      });
  },
  getDB: () => dbConnection,
};
