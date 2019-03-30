var express = require('express')
const router = express.Router()
var mysql = require('mysql')
const { check, validationResult, body } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter')

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'digital1010',
  database: 'Product',
  multipleStatements: true
})

// router.post('/check', function (req, res, next) {
//  console.log(req.body);

// })

router.post('/order', function (req, res, next) {
  console.log(req.body)
  var length = req.body.length
  var result1 = []
  req.body.map(user => {
    // console.log(user)
    var date = new Date()
    const data = {
      product_id: user.Product_id,
      id: user.id,
      order_date: date
    }
    // var date = new Date()
    console.log(data)

    const sql = 'insert into Orders (product_id,id,order_date) values(?,?,?)'
    con.query(sql, [data.product_id, data.id, data.order_date], function (
      err,
      result
    ) {
      if (err) throw err

      result1.push(result)

      if (result1.length == length) {
        console.log(result, 'final')

        res.json(true)
      }
      //   console.log('Error', result)
      // res.send(result)
      // res.json(result)
    })
  })

  //   const sql = 'select * from Product'
  //   con.query(sql, [req.body.id], function (err, result) {
  //     if (err) throw err
  //     if (result.length > 0) {

  //       res.json(result)
  //     } else {
  //       console.log('Error')

  //       res.json(err)
  //     }
  //   })
})

module.exports = router
