const { MongoClient } = require("mongodb");
const passport = require("passport");
const { Strategy } = require("passport-local");
const debug = require("debug")("app:PassportLocal");

module.exports = function localStrategy() {
  passport.use(
    new Strategy(
      {
        usernameField: "username",
        passwordField: "password",
      },
      (username, password, done) => {
        const url =
    "mongodb+srv://vathsa:vathsa@cluster0.3xkvx.mongodb.net/?retryWrites=true&w=majority";
    const dbName = "nodeExpressPractice";
    (async function validateUser() {
      let client;
    try {
      client = await MongoClient.connect(url);
      debug("Connected to DB")

      const db = client.db(dbName)
      const user = await db.collection("users").findOne({username}) 

      console.log("Check the user : ", user)

      if(user && user.password === password) {
        done(null, user)
      } else {
        done(null, false)
      }

    } catch (error) {
done(error, false)
    }
    client.close();
    }())
      }
    )
  );
};
