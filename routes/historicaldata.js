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
    const sDate = new Date(2017, 4, 1, 0, 0, 0)
    const eDate = new Date(2018, 4, 2, 0, 0, 0)
    db.models.historicaldata.importHistory('BTC-USD', sDate, eDate, 3600)
    res.redirect('historicaldata/chart')
  } catch (e) {
    next(e)
  }
})

router.get('/chart', async (req, res, next) => {
  try {
    const histData = await db.models.historicaldata.findAll()
    const chartLabels = histData.slice(0, 5).map((elem) => {
      return elem.dataValues.histTime
    })
    const chartSeries = histData.slice(0, 5).map((elem) => {
      return elem.dataValues.close
    })
    const chartData = { labels: chartLabels, series: [chartSeries] }
    console.log(chartLabels, chartSeries)
    res.send(historicalData(chartLabels, chartSeries))
  } catch (e) {
    next(e)
  }
})

router.get('/update', async (req, res, next) => {
  try {
    await db.models.historicaldata.findOrCreate({ where: { time: data[0] } })
    throw 'error update not set up'
  } catch (e) {
    next(e)
  }
})

module.exports = router
