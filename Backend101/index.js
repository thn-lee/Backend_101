const express = require("express");
const member = require("./routers/member");
const zercle = require("./routers/zercle");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.text());
app.use("/member", member);
app.use("/zercle", zercle);
// app.use("/scientific");

app.get("/", (req, res) => {
  const e = eval(2 + 2);
  return res.send(`${e}`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// Hello *memberName*!, Welcome to *place* in year *year* , *welcome Message*
// memberName = urlParam , year = queryParam , etc.. in body
