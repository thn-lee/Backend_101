const express = require("express");
const { route } = require("express/lib/application");
const mariadb = require("mariadb");
const router = express.Router();

const pool = mariadb.createPool({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "root",
  database: "company",
  connectionLimit: 5,
  //   multipleStatements: true,
});

//CRUD = Create Read Update Delete

router.post("/create", async (req, res) => {
  const body = req.body;
  const connection = await pool.getConnection();
  await connection.query(
    `INSERT INTO employee VALUES ("${body.employeeName}",${body.age},
    "${body.SSN}",${body.salary},${body.department},${body.graduated})`
  );
  connection.release();
  connection.end();
  return res.json({
    msg: "Data has been inserted.",
  });
});

router.delete("/delete/:ssn", async (req, res) => {
  const connection = await pool.getConnection();
  await connection.query(
    `DELETE FROM employee WHERE SSN = "${req.params.ssn}";`
  );
  connection.release();
  connection.end();
  return res.json({
    msg: "Data has been deleted",
  });
});

router.patch("/update/:ssn", async (req, res) => {
  const ssn = req.params.ssn;
  const body = req.body;
  let queryString = "UPDATE employee SET ";
  for (let key in body) {
    if (key == "emp_name") {
      queryString += `${key} = "${body[key]}", `;
    } else {
      queryString += `${key} = ${body[key]}, `;
    }
  }
  queryString = queryString.slice(0, -2);
  queryString += ` WHERE SSN = ${ssn};`;
  const connection = await pool.getConnection();
  await connection.query(queryString);
  connection.release();
  connection.end();
  return res.json({
    msg: "update Complete!",
  });
});

router.get("/all", async (req, res) => {
  const connection = await pool.getConnection();
  const data = await connection.query("SELECT * FROM employee");
  connection.release();
  connection.end();
  return res.json(data);
});

module.exports = router;
