const express = require("express");
const sendmailCtrl = require("../controllers/sendmail.js");

const router = express.Router();

router.post("/api/sendmail", sendmailCtrl.sendMail);

module.exports = router;
