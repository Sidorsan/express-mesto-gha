const http = require ('http');
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.setHeader = ('Content-Type', 'text/plain');
  res.write = ('kmkpmkp');
  res.end();

})

server.listen(3005, '127.0.0.1', console.log('Сервер запущен')
)