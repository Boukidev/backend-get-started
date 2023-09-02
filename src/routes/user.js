const express = require("express");
const userCtrl = require("../controllers/user.js");
const auth = require("../middleware/auth.js");

const router = express.Router();

router.post("/signup", userCtrl.signup);
router.post("/login", auth.localAuthMiddleware, userCtrl.login);

module.exports = router;
