const fs = require('fs')

const requestHandler = (req, res) => {
  const url = req.url
  const method = req.method
  if(url === '/') {
    res.write('<html>')
    res.write('<head><title>Enter message</title></head>');
    res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>')
    res.write('</html>')
    return res.end()
  }

  if(url === '/message' && method === 'POST') {
    const body = []
    req.on('data', (chunk) => {
			console.log('chunk', chunk)
      body.push(chunk)
    })

    return req.on('end', () => {
      const paresedBody = Buffer.concat(body).toString()
			// console.log('paresedBody', paresedBody)
      const message = paresedBody.split('=')[1]
			console.log('message : ', message)
      fs.writeFile('message.txt', message, err => {
        res.statusCode = 302
        res.setHeader('Location', '/')
        return res.end()
      })
    })
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My First Page</title></head>');
  res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
  res.write('</html>');
  res.end();
}
//module export
//ex.1 
// module.exports = requestHandler

//ex.2
module.exports = {
  handler: requestHandler,
  someText: 'Some Text'
}

//ex.3
// module.exports.handler = requestHandler
// module.exports.someText = 'Some Text'

//ex.4
// exports.handler = requestHandler
// exports.someText = 'Some Text'