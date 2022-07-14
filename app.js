const express = require("express");
const app = express();
app.get("/", (req, res) => {
  res.status(200);
  res.send("hello world");
});
app.listen(3005, () => {
  console.log("Load");
});

// const http = require ('http');
// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.statusMessage = 'OK';
//   res.setHeader = ('Content-Type', 'text/plain');
//   res.write = ('kmkpmkp');
//   res.end();

// })

// server.listen(3005, '127.0.0.1', console.log('Сервер запущен')
// )
