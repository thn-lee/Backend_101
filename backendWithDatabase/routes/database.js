const express = require("express");
const router = express.Router();

router.get("/employee", (req, res) => {
  res.send("Hello");
});

module.exports = router;
