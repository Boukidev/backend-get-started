const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "employees",
  password: "Boubou06!",
  port: 27018,
});

module.exports = pool;
