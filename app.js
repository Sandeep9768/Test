const express = require('express')
const Login = require('./api/router/Login.js')
const product = require('./api/router/product.js')
// const Activity=require('./api/router/Activity.js');
// const Attendance=require('./api/router/Attendance.js');
// const LabourReport=require('./api/router/LabourReport.js')
// const ViewReport=require('./api/router/ViewReport.js')
var bodyParser = require('body-parser')
const order = require('./api/router/order.js')
const app = express()

const morgan = require('morgan')
app.use(express.json())
app.use(morgan('dev'))

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    return res.status(200).json({})
  }
  next()
})

app.use('/login', Login)
app.use('/product', product)
app.use('/order', order)
// app.use('/attendance',Attendance);
// app.use('/viewreport',ViewReport);
// app.use('/labourreport',LabourReport);

// ROUTE NOT FOUND
// app.use((req, res, next) => {
//     var error = new Error('Not Found');
//     error.status = 404;
//     next(error);
// });

// //ERROR HANGLING
// app.use((error, req, res, next) => {
//     res.status(error.status || 500);
//     res.json({
//         error: error.message
//     });
// });

module.exports = app
