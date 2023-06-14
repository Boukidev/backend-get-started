const express = require("express");
const thingCtrl = require("../controllers/thing.js");
const auth = require("../middleware/auth.js");

const router = express.Router();

router.get("/", auth.jwtAuthMiddleware, thingCtrl.getThings);
router.post("/", auth.jwtAuthMiddleware, thingCtrl.postThing);
router.get("/:id", auth.jwtAuthMiddleware, thingCtrl.getThing);
router.put("/:id", auth.jwtAuthMiddleware, thingCtrl.putThing);
router.delete("/:id", auth.jwtAuthMiddleware, thingCtrl.deleteThing);

module.exports = router;
