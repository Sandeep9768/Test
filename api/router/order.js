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
      // res.status(err)
      result1.push(result)

      if (result1.length == length) {
        console.log(result, 'final')

        res.json(result)
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

router.post(
  '/purchase',
  function (req, res, next) {
    // var date = new Date()
    // console.log(req.body.id)

    const sql = 'select * from Orders where id=?'
    con.query(sql, [req.body.id], function (err, result) {
      if (err) throw err

      if (result.length > 0) {
        // console.log(result, 'final')
        req.body = []
        req.body = result
        console.log(req.body, 'body')
        var final = []
        var purchase = []
        var data = req.body
        data.map(user => {
          console.log(user.product_id)
          const sql = 'select * from Product where product_id=?'
          con.query(sql, [user.product_id], function (err, result) {
            if (err) throw err

            if (result.length > 0) {
              purchase.push(req.body)
              purchase.push(result)
              final.push(purchase)
              res.send(final)
              // res.json(purchase)
            } else {
              console.log('error')
              res.json(err)
            }
          })
        })
        // res.json(result)
        next()
      } else {
        console.log('error')
        // res.json(err)
      }
    })
  },
  function (req, res, next) {
    // var date = new Date()
    // console.log(req.body, 'body')
    // var purchase = []
    // var data = req.body
    // data.map(user => {
    //   console.log(user.product_id)
    //   const sql = 'select * from Product where product_id=?'
    //   con.query(sql, [user.product_id], function (err, result) {
    //     if (err) throw err
    //     if (result.length > 0) {
    //       req.body = result
    //       purchase = req.body
    //       res.send(purchase)
    //       // res.json(purchase)
    //     } else {
    //       console.log('error')
    //       res.json(err)
    //     }
    //   })
    // })
  }
)

module.exports = router
