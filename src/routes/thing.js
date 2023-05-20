const express = require("express");
const thingCtrl = require("../controllers/thing.js");

const router = express.Router();

router.post("/api/things", thingCtrl.postThing);
router.get("/api/things", thingCtrl.getThings);
router.get("/api/things/:id", thingCtrl.getThing);
router.put("/api/things/:id", thingCtrl.putThing);
router.delete("/api/things/:id", thingCtrl.deleteThing);

module.exports = router;
