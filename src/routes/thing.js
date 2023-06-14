const express = require("express");
const thingCtrl = require("../controllers/thing.js");
const auth = require("../middleware/auth.js");

const router = express.Router();

router.get("/", auth.jwtAuthMiddleware, thingCtrl.getThings);
router.post("/", thingCtrl.postThing);
router.get("/:id", thingCtrl.getThing);
router.put("/:id", thingCtrl.putThing);
router.delete("/:id", thingCtrl.deleteThing);

module.exports = router;
