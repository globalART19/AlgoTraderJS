const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const volleyball = require('volleyball')
const app = express()
module.exports = app

app.use(volleyball)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, '..', 'public')))

app.use('/api', require('./api'))

app.use((req, res, next) => {
  if (path.extname(req.path).length > 0) {
    res.status(404).end()
  } else {
    next()
  }
})

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'index.html'))
})

app.use((err, req, res, next) => {
  console.error(err, typeof next)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error.')
})

app.use((req, res) => {
  res.status(404).send(`Page doesn't exist ya dummy!`)
})
