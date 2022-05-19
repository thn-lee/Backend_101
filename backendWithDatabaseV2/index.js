const express = require("express");
const employee = require("./routes/employee");
const app = express();
const port = 3000;

app.use(express.json());
app.use("/employee", employee);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(port, () => {
  console.log("App listen on port : ", port);
});
