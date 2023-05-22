const express = require("express");
const employeesCtrl = require("../controllers/employeesCtrl.js");

const router = express.Router();

router.get("/api/employees", employeesCtrl.getEmployees);
router.post("/api/employees", employeesCtrl.postEmployee);
router.get("/api/employees/:id", employeesCtrl.getEmployee);
router.put("/api/employees/:id", employeesCtrl.putEmployee);
router.delete("/api/employees/:id", employeesCtrl.deleteEmployee);

module.exports = router;
