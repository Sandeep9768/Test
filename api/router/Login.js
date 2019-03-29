var express = require('express')
const router = express.Router()
var mysql = require('mysql')
const { check, validationResult, body } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter')

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'digital1010',
  database: 'Student',
  multipleStatements: true
})

// router.post('/check', function (req, res, next) {
//  console.log(req.body);

// })

router.post(
  '/check',
  [
    // username must be an email
    check('username')
      .isEmail()
      .withMessage('must be at least 5 chars long'),
    // password must be at least 5 chars long
    check('password')
      .isLength({ min: 5 })
      .withMessage('password isnot valide')
  ],
  function (req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    } else {
      res.json('result')
    }

    // User.create({
    //   username: req.body.username,
    //   password: req.body.password
    // }).then(user => res.json(user))
  }
)

module.exports = router
