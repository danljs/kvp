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
    // for(let i = 0 ; i < 100000000 ; i++){
    //   console.log("haha");
    // }
    res.send('Hello!')
  })

  app.get('/users', (req, res) => {
    console.log(req.query)
    res.send(JSON.stringify({ data: [{key:'kkk',value:'vvv'}, {key:'qqq',value:'www'}] }));
  })
  
  let port = process.env.PORT || 1234
  app.listen(port, () => console.log('http server listening on %d', port))
})()