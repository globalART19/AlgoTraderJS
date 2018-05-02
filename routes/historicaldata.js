const express = require('express')
const router = express.Router()
const { db } = require('../models')
const { historicalData } = require('../views')

router.get('/', async (req, res, next) => {
  try {
    res.send(historicalData('Historical Data Page!'))
  } catch (e) {
    next(e)
  }
})

router.post('/', async (req, res, next) => {
  try {
    await db.HistoricalData.importHistory('BTC-USD', new Date(2018, 4, 1, 0, 0, 0), new Date(2018, 5, 1, 0, 0, 0), 3600)
    console.log('Data import complete?')
    res.redirect('/')
  } catch (e) {
    next(e)
  }
})

router.get('/update', async (req, res, next) => {
  try {
    await
      await db.historicalData.findOrCreate({ where: { time: data[0] } })
  } catch (e) {
    next(e)
  }
})

module.exports = router
