var http = require('http')
var app = require('./app.js')
const express = require('express')

var port = process.env.port || 9000
const server = http.createServer(app)

app.use(express.static('/'))

server.listen(port)
