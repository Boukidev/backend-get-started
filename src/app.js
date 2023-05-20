const express = require("express");
const mongoose = require("mongoose");
const routeThing = require("./routes/thing.js");
const routeProduct = require("./routes/product.js");

const app = express();
mongoose
  .connect("mongodb://127.0.0.1:27017/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connect to db successfuly !"))
  .catch((err) => console.error("Error connection to db", err));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

app.use(express.json());

app.use("/", routeThing);
app.use("/", routeProduct);

module.exports = app;
