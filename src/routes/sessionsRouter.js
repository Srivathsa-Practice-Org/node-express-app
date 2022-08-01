const sessions = require("../data/sessions.json");
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const debug = require("debug")("app:SessionsRoute");

const sessionRouter = express.Router();

sessionRouter.route("/").get((req, res) => {
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
      const sessions = await db.collection("sessions").find().toArray();
      console.log("Check db Resp : ", sessions);
      res.render("sessions", { sessions });
    } catch (error) {
      console.log("Err : ", error.stack);
    }
    client.close();
  })();
});
sessionRouter.route("/:id").get((req, res) => {
  const id = req.params.id;
  const url =
    "mongodb+srv://vathsa:vathsa@cluster0.3xkvx.mongodb.net/?retryWrites=true&w=majority";
  const dbName = "nodeExpressPractice";
  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);
      debug("Connected to MongoDb");
      const db = client.db(dbName);
      const session = await db
        .collection("sessions")
        .findOne({ _id: new ObjectId(id) });
      res.render(`session`, { session });
    } catch (error) {
      console.log("Err : ", error.stack);
    }
    client.close();
  })();
});

module.exports = sessionRouter;