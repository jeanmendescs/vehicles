const { MongoClient } = require("mongodb");
require("dotenv").config();

const { VEHICLES } = require("../database/MOCK");

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
  seedDB: (cb) => {
    MongoClient.connect(url)
      .then((client) => {
        dbConnection = client.db();
        dbConnection.collection("cars").deleteMany({});
        dbConnection.collection("cars").insertMany(VEHICLES);
        dbConnection.collection("cars").createIndex({ vehicle: "text" });

        return cb();
      })
      .catch((err) => {
        console.log(err);
        return cb(err);
      });
  },
};
