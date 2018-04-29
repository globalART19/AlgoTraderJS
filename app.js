const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const models = require('./models')
const router = require('./routes/main')
const views = require('./views')
const app = express()

app.use(morgan('dev'))
app.use(bodyParser())
app.use(express.static(__dirname + '/public'))
app.use('/', router)

const PORT = 1337

async function init() {
  await models.db.sync({ force: true })
  app.listen(1337, () => { console.log(`app listening on ${PORT}`) })
}

init()
