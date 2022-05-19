const express = require("express");
const router = express.Router();

function checkThisPersonIsInZercle(req, res, next) {
  const thisPerson = req.body.person;
  if (thisPerson == undefined) {
    return res.status(400).json({
      err: "who are you?",
    });
  }
  if (thisPerson == "Kevin" || thisPerson == "P'Note") {
    next();
  }
  res.status(401).json({
    err: "you don't have permission to access this secret",
  });
}

function checkThisPersonIsInIncubator(req, res, next) {
  const thisPerson = req.body.person;
  const incubator = ["nanai", "pond", "sasi", "kik"];
  if (thisPerson == undefined) {
    return res.status(400).json({
      err: "who are you?",
    });
  }
  if (incubator.includes(thisPerson)) {
    next();
  }
  res.status(401).json({
    err: "you don't have permission to access this secret",
  });
}

function checkIs2022Incubator(req, res, next) {
  if (req.body.year == "2022") {
    next();
  }
  res.json({
    err: "you are not 2022 Incubator",
  });
}

router.get("/", (req, res) => {
  res.send("Hello from Zercle Router!!");
});

router.post("/superVeryVerySecret", checkThisPersonIsInZercle, (req, res) => {
  res.send("Kevin is CEO!!");
});

router.post(
  "/incubation",
  [checkThisPersonIsInIncubator, checkIs2022Incubator],
  (req, res) => {
    res.send(`Hello zercle incubation`);
  }
);

router.get("/incubation", (req, res) => {
  const memberName = req.query.memberName;
  const year = req.query.year;
  res.send(`Hello ${memberName}!! welcome to zercle incubation ${year}`);
});

router.get("/incubation/:year", (req, res) => {
  const memberName = req.query.memberName;
  const year = req.params.year;
  res.send(`Hello ${memberName}!! welcome to zercle incubation ${year}`);
});

router.get("/:memberName/:year", (req, res) => {
  res.json({
    name: req.params.memberName,
    year: req.params.year,
  });
});

module.exports = router;

/*
  body = {
    value1: num
    ops: string
    value2: num
  }
  middleware num >= 0 , ops = [+ - * /]
  router classic

  body = {
    equation: string // ex. "6 + 4 - 2 + 3 / 6"
  }
  router scientific [+ - * /]
*/
