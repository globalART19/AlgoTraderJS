const router = require('express').Router()
const { db } = require('../db/')

router.get('/historicaldata', async (req, res, next) => {
  try {
    const historicalData = await HistoricalData.findAll()
    res.json(historicalData)
  } catch (e) {
    next(e)
  }
})

router.post('/historicaldata', async (req, res, next) => {
  try {
    const sDate = new Date(2017, 4, 1, 0, 0, 0)
    const eDate = new Date(2018, 4, 2, 0, 0, 0)
    db.models.historicaldata.importHistory('BTC-USD', sDate, eDate, 3600)
    res.sendStatus(201)
  } catch (e) {
    next(e)
  }
})

router.get('/historicaldata/chart', async (req, res, next) => {
  try {
    const histData = await db.models.historicaldata.findAll()
    const chartData = histData.map((elem) => {
      // let histTime = new Date(0)
      // histTime.setUTCMilliseconds(elem.dataValues.histTime)
      return [elem.dataValues.histTime, elem.dataValues.close]
    })
    chartData.unshift(['Time (1 hr intervals)', 'Price($)'])
    console.log(chartData)
    res.json(JSON.stringify(chartData))
  } catch (e) {
    next(e)
  }
})

module.exports = router
