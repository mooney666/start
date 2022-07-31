const express = require("express");
const cors = require("cors");
const router = require("./router");
const app = express();

app.use(express.static("../"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);


app.listen(3000, () => {
  console.log("服务启动成功");
});
