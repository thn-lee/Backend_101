const express = require("express");
const database = require("./routes/database");
const app = express();
const port = 3000;

app.use(express.json());

app.use("/database", database);

app.listen(port, () => {
  console.log("app listen on port ", port);
});
