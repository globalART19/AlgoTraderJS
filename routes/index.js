const express = require('express')
const router = express.Router()
const main = require('./main')
const user = require('./user')
const algorithm = require('./algorithm')
const historicalData = require('./historicaldata')
const charts = require('./charts')
const orderBook = require('./orderbook')

router.use('/', main)
router.use('/user', user)
router.use('/algorithm', algorithm)
router.use('/historicaldata', historicalData)
router.use('/charts', charts)
router.use('/orderbook', orderBook)

module.exports = router
