const router = require('express').Router()
const { db, HistoricalData } = require('../db/')
const { calculateIndicators } = require('../datamanipulation/historicaldatacalc')

router.get('/', async (req, res, next) => {
  try {
    console.log('Get Data API')
    const historicalData = await HistoricalData.findAll()
    res.json(historicalData)
  } catch (e) {
    next(e)
  }
})

router.post('/', async (req, res, next) => {
  try {
    console.log('Import Data API')
    const sDate = new Date(2017, 4, 1, 0, 0, 0)
    const eDate = new Date(2018, 4, 2, 0, 0, 0)
    await HistoricalData.importHistory('BTC-USD', sDate, eDate, req.body.period)
    res.sendStatus(201)
  } catch (e) {
    next(e)
  }
})

// router.post('/updateindicators', async (req, res, next) => {
//   try {
//     console.log('req.body update', req.body.period, req.body.granularity)
//     const calculatedIndicators = await HistoricalData.updateIndicators(req.body.period, req.body.granularity)
//     res.sendStatus(201)
//   } catch (e) {
//     next(e)
//   }
// })

router.post('/chart', async (req, res, next) => {
  try {
    console.log('in /chart api')
    const histData = await HistoricalData.findAll({ attributes: ['histTime', 'close'], order: [['histTime', 'ASC']] })
    // console.log('pulled historical data', histData)
    const histDataArray = histData.map((instance) => {
      return [instance.dataValues.histTime, instance.dataValues.close]
    })
    console.log(histDataArray, 'histDataArray')
    if (req.body.period) {
      console.log(req.body)
      const chartData = await calculateIndicators(req.body.period, req.body.granularity, histDataArray)
      chartData.unshift(['Time (1 hr intervals)', 'Price($)', 'm12ema', 'm26ema', 'mave', 'msig', 'rsi'])
      console.log(chartData, 'chartData')
      res.json(JSON.stringify(chartData))

    } else {
      histDataArray.unshift(['Time (1 hr intervals)', 'Price($)'])
      console.log('raw histData to chart data', histDataArray[0], histDataArray[1])
      res.json(JSON.stringify(histDataArray))
    }
    // const chartData = calculatedIndicators.map((elem) => {
    // let histTime = new Date(0)
    // histTime.setUTCMilliseconds(elem.dataValues.histTime)
    // return [elem.dataValues.histTime, elem.dataValues.close, elem.dataValues.m12ema, elem.dataValues.m26ema, elem.dataValues.mave, elem.dataValues.msig, elem.dataValues.rsi]
    // })
  } catch (e) {
    next(e)
  }
})

module.exports = router
