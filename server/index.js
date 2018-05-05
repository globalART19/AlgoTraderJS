const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()
module.exports = app

app.use(morgan())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, '..', 'public')))
// app.use(express.static(path.join(__dirname, '..', 'node_modules', 'font-awesome', 'css')))
// app.use('/fonts', express.static(path.join(__dirname, '..', 'node_modules', 'font-awesome', 'fonts')))

app.use('/api', require('./api'))

// This middleware will catch any URLs resembling a file extension
// for example: .js, .html, .css
// This allows for proper 404s instead of the wildcard '#<{(|' catching
// URLs that bypass express.static because the given file does not exist.
app.use((req, res, next) => {
  if (path.extname(req.path).length > 0) {
    res.status(404).end()
  } else {
    next()
  }
})

app.get('/', (req, res, next) => {
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
