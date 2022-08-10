const express = require("express");
const chalk = require("chalk");
const debug = require("debug")("app");
const morgan = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const app = express();

const port = process.env.PORT;

app.use(morgan("tiny"));
app.use(express.static(path.join(__dirname, "/public/")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: "nodeExpressPractice" }));

require("./src/config/passport")(app);

app.set("views", "./src/views");
app.set("view engine", "ejs");

const sessionRouter = require("./src/routes/sessionsRouter");
const adminRouter = require("./src/routes/adminRouter");
const authRouter = require("./src/routes/authRouter");
const testRouter = require("./src/routes/testDynamicDB");

app.use("/sessions", sessionRouter);
app.use("/admin", adminRouter);
app.use("/auth", authRouter);
app.use("/test", testRouter);

app.get("/", (req, res) => {
  res.render("index", {
    title: "Hello This is my First app",
    data: ["a", "b", "c"],
  });
});

app.listen(5024, () => {
  debug(`Listening on ${chalk.green(port)}`);
});
