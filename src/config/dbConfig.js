const { MongoClient } = require("mongodb");

const debug = require("debug")("app:DBConnection");

const url =
  "mongodb+srv://vathsa:vathsa@cluster0.3xkvx.mongodb.net/?retryWrites=true&w=majority";

module.exports = {
  dbInit: async function (dbName) {
    let client;
    try {
      client = await MongoClient.connect(url);
      debug("Connected to DB");

      return client.db(dbName);
    } catch (err) {
      console.log("DB Error : ", err);
    }
    client.close();
  },
};
