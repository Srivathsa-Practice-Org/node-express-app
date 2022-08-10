const sessions = require("../data/sessions.json");
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const debug = require("debug")("app:SessionsRoute");

const speakerService = require("../services/speakerServices");
const { dbInit } = require("../config/dbConfig");

const sessionRouter = express.Router();

sessionRouter.use((req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect("/auth/signIn");
  }
});

sessionRouter.route("/").get((req, res) => {
  const url =
    "mongodb+srv://vathsa:vathsa@cluster0.3xkvx.mongodb.net/?retryWrites=true&w=majority";
  const dbName = "nodeExpressPractice";
  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);
      const db = client.db(dbName);
      console.log("In Sessions Route : ", db);
      const sessions = await db.collection("sessions").find().toArray();
      res.render("sessions", { sessions });
    } catch (error) {
      console.log("Err : ", error.stack);
    }
    client.close();
  })();
});
// sessionRouter.route("/:id").get((req, res) => {
//   const id = req.params.id;
//   const url =
//     "mongodb+srv://vathsa:vathsa@cluster0.3xkvx.mongodb.net/?retryWrites=true&w=majority";
//   const dbName = "nodeExpressPractice";
//   (async function mongo() {
//     let client;
//     try {
//       client = await MongoClient.connect(url);
//       debug("Connected to MongoDb");
//       const db = client.db(dbName);
//       const session = await db
//         .collection("sessions")
//         .findOne({ _id: new ObjectId(id) });
//       const speaker = await speakerService.getSpeakerById(
//         session.speakers[0].id
//       );
//       session.speaker = speaker.data;
//       res.render(`session`, { session });
//     } catch (error) {
//       console.log("Err : ", error.stack);
//     }
//     client.close();
//   })();
// });

sessionRouter.route("/:id").get(async (req, res) => {
  const id = req.params.id;
  const db = await dbInit("nodeExpressPractice");
  const session = await db
    .collection("sessions")
    .findOne({ _id: new ObjectId(id) });
  // const speaker = await speakerService.getSpeakerById(session.speakers[0].id);
  // session.speaker = speaker.data;
  res.json(session);
});

module.exports = sessionRouter;
