'use strict'
module.exports = (() => {
  let express = require('express')

  let app = express()

  app.use( function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
  })

  app.get('/', (req, res) => {
    res.send('Hello!')
  })

  app.get('/users', (req, res) => {
    console.log(req.query)
    res.send(JSON.stringify({ a: 1 }));
  })
  
  let port = process.env.PORT || 1234
  app.listen(port, () => console.log('http server listening on %d', port))
})()