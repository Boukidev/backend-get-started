const express = require("express");
const pool = require("./config/db.js");
const routeEmployees = require("./routes/employeesRoute.js");

const app = express();

pool.connect((err, client, done) => {
  if (err) console.error(err);
  else console.log("Connexion to postgresql is done !");
  done();
});

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

app.use("/", routeEmployees);

module.exports = app;
