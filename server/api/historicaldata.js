const router = require('express').Router()
const { db } = require('../db/')

router.get('/', async (req, res, next) => {
  try {
    const historicalData = await db.models.historicaldata.findAll()
    res.json(historicalData)
  } catch (e) {
    next(e)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const sDate = new Date(2017, 4, 1, 0, 0, 0)
    const eDate = new Date(2018, 4, 2, 0, 0, 0)
    await db.models.historicaldata.importHistory('BTC-USD', sDate, eDate, req.body.period)
    res.sendStatus(201)
  } catch (e) {
    next(e)
  }
})

router.post('/updateindicators', async (req, res, next) => {
  try {
    await db.models.historicaldata.updateIndicators(req.body.period)
    res.sendStatus(201)
  } catch (e) {
    next(e)
  }
})

router.get('/chart', async (req, res, next) => {
  try {
    const histData = await db.models.historicaldata.findAll({ order: [['histTime', 'ASC']] })
    const chartData = histData.map((elem) => {
      // let histTime = new Date(0)
      // histTime.setUTCMilliseconds(elem.dataValues.histTime)
      return [elem.dataValues.histTime, elem.dataValues.close, elem.dataValues.m12ema, elem.dataValues.m26ema, elem.dataValues.mave, elem.dataValues.msig, elem.dataValues.rsi]
    })
    chartData.unshift(['Time (1 hr intervals)', 'Price($)', 'm12ema', 'm26ema', 'mave', 'msig', 'rsi'])
    res.json(JSON.stringify(chartData))
  } catch (e) {
    next(e)
  }
})

module.exports = router
