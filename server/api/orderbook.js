const router = require('express').Router()
const { db } = require('../db')

router.get('/', (req, res, next) => {
  try {
    res.send('/Get dat orderbook')
  } catch (e) {
    next(e)
  }
})

router.post('/', (req, res, next) => {
  try {
    res.send("You posted some stuff...I get it")
  } catch (e) {
    next(e)
  }
})

router.get('/chart', async (req, res, next) => {
  try {
    const histData = await db.models.historicaldata.findAll()
    const chartData = histData.map((elem) => {
      // let histTime = new Date(0)
      // histTime.setUTCMilliseconds(elem.dataValues.histTime)
      return [elem.dataValues.histTime, elem.dataValues.close]
    })
    chartData.unshift(['Time (1 hr intervals)', 'Price($)'])
    res.json(JSON.stringify(chartData))
  } catch (e) {
    next(e)
  }
})

module.exports = router
