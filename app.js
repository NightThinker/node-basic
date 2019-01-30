const http = require('http');

const routes = require('./routes')

console.log('TCL: routes', routes.someText)

const server = http.createServer(routes.handler)

server.listen(3000);