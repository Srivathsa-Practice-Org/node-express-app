const express = require("express");
const { MongoClient } = require("mongodb");
const debug = require("debug")("app:adminRoute");
const sessions = require("../data/sessions.json");

const adminRoute = express.Router();

console.log("Check in Top : ");

adminRoute.route("/v1").get((req, res) => {
  console.log("Check the adminROute : ");
  const url =
    "mongodb+srv://vathsa:vathsa@cluster0.3xkvx.mongodb.net/?retryWrites=true&w=majority";
  const dbName = "nodeExpressPractice";
  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);
      debug("Connected to MongoDb");
      console.log("COnnected to mongoDb Console");
      const db = client.db(dbName);
      const response = await db.collection("sessions").insertMany(sessions);
      console.log("Check db Resp : ", response);
      res.json(response);
    } catch (error) {
      console.log("Err : ", error.stack);
    }
    client.close();
  })();
});

module.exports = adminRoute;
