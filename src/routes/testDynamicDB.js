const express = require("express");
const { dbInit } = require("../config/dbConfig");

const testRoute = express.Router();

testRoute.route("/").get(async (req, res) => {
  const db = await dbInit("nodeExpressPractice");
  console.log("Check the DB : ", db);
  const userData = await db.collection("users").find().toArray();
  console.log("Check in rtest Route :", userData);

  res.json(userData);
});

module.exports = testRoute;
