require("dotenv").config();
const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");

const thingRoutes = require("./routes/thing.js");
const userRoutes = require("./routes/user.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connect to db successfuly !"))
  .catch((err) => console.error("Error connection to db", err));

app.use("/api/stuff", thingRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
