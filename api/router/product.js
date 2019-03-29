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

router.get('/product', function (req, res, next) {
  console.log(req.body.id)

  const sql = 'select * from Product'
  con.query(sql, [req.body.id], function (err, result) {
    if (err) throw err
    if (result.length > 0) {
      // res.json(result2)
      res.json(result)
    } else {
      console.log('Error')
      //   console.log("e="+err);
      res.json(err)
    }
  })
})

module.exports = router
