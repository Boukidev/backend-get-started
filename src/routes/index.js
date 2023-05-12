const express = require("express");
const ctrl = require("../controllers/index.js");

const router = express.Router();

router.get("/", ctrl.getFunction);

module.exports = router;
