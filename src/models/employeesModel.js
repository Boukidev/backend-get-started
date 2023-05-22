const pool = require("../config/db.js");

class Employees {
  static async getAll() {
    try {
      const result = await pool.query("SELECT * FROM employees");
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  static async get() {
    try {
      const result = await pool.query("SELECT * FROM employees WHERE id=$1", [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async create(id, first_name, last_name, salary) {
    try {
      const result = await pool.query(
        "INSERT INTO employees(id, first_name, last_name, salary) VALUES ($1, $2, $3, $4) RETURNING *",
        [id, first_name, last_name, salary]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async update(id, first_name, last_name, salary) {
    try {
      const result = await pool.query(
        "UPDATE employees SET first_name=$1, last_name=$2, salary=$3 WHERE id=$4 RETURNING *",
        [first_name, last_name, salary, id]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      await pool.query("DELETE FROM employees WHERE id=$1", [id]);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Employees;
