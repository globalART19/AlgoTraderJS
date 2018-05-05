const router = require('express').Router()
const { HistoricalData } = require('../db/')

router.get('/historicaldata', async (req, res, next) => {
  try {
    const historicalData = await HistoricalData.findAll()
    res.json(historicalData)
  } catch (e) {
    next(e)
  }
})

module.exports = router
