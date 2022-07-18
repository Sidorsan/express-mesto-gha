const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const router = require("./routes");
const loggerMiddlewares = require("./middlewares/logger");

app.use(loggerMiddlewares);
app.use(bodyParser.json());
app.use(router);


mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.listen(3000, () => {
  console.log("Load");
});
