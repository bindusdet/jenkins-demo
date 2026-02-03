const http = require('http');

http.createServer((req, res) => {
  res.end('Hello from Jenkins CI/CD Pipeline');
}).listen(3000);
