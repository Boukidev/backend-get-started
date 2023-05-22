const Employees = require("../models/employeesModel.js");

exports.getEmployees = async (req, res, next) => {
  try {
    const result = await Employees.getAll();
    res.status(200).json({ employees: result });
  } catch (error) {
    console.error("Error while retrieving employees :", error);
    res.status(500).json({ error: error });
  }
  next();
};

exports.getEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Employees.get(id);
    if (!result) return res.status(404).json({ error: "Employee not found" });
    res.status(200).json({ employee: result });
  } catch (error) {
    console.error("Error while retrieving employee :", error);
    res.status(500).json({ error: error });
  }
  next();
};

exports.postEmployee = async (req, res, next) => {
  try {
    const { id, first_name, last_name, salary } = req.body;
    const result = await Employees.create(id, first_name, last_name, salary);
    res.status(201).json({ employee: result });
  } catch (error) {
    console.error("Error while create a new employee", error);
    res.status(500).json({ error: error });
  }
  next();
};

exports.putEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, salary } = req.body;
    const result = await Employees.update(id, first_name, last_name, salary);
    res.status(200).json({ employee: result });
  } catch (error) {
    console.error("Error while update employee", error);
    res.status(500).json({ error: error });
  }
  next();
};

exports.deleteEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Employees.delete(id);
    res.sendStatus(204);
  } catch (error) {}
  console.error("Error while delete employee", error);
  res.status(500).json({ error: error });
  next();
};
