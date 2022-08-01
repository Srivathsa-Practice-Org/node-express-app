const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const debug = require("debug")("app:SessionsRoute");

const authRouter = express.Router();

authRouter.route("/signUp").post((req, res) => {
  const { username, password } = req.body;
  const url =
    "mongodb+srv://vathsa:vathsa@cluster0.3xkvx.mongodb.net/?retryWrites=true&w=majority";
  const dbName = "nodeExpressPractice";

  (async function addUser() {
    let client;
    try {
      client = await MongoClient.connect(url);
      const db = client.db(dbName);
      const user = { username, password };
      const results = await db.collection("users").insertOne(user);
      console.log("results ", results);
      req.login(results, () => {
        res.redirect("/auth/profile");
      });
    } catch (err) {
      debug(err);
    }
    client.close();
  })();
});

authRouter.route("/profile").get((req, res) => {
  res.json(req.user);
});

module.exports = authRouter;
