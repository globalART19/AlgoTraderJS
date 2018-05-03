const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const models = require('./models')
const routes = require('./routes')
const app = express()

app.use(morgan('dev'))
app.use(bodyParser())
app.use(express.static(__dirname + '/public'))
app.use('/', routes)

const PORT = 1337

async function init() {
  await models.db.sync({ force: false })
  app.listen(1337, () => { console.log(`app listening on ${PORT}`) })
}

init()
