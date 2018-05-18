const db = require('./db')
const Sequelize = require('sequelize')

const Indicator = db.define('indicators', {
  m12ema: Sequelize.INTEGER,
  m26ema: Sequelize.INTEGER,
  mave: Sequelize.INTEGER,
  msig: Sequelize.INTEGER,
  rsi: Sequelize.INTEGER,
})

Indicator.calculateAll = async function () {
  const setPeriod = 1; //in days
  // const granularity = HistoricalData.findById(2).histTime - HistoricalData.findById(1).histTime
  const histData = await HistoricalData.findAll()
  const granularity = Math.abs(histData[0] - histData[1])
  const dataPointsPerPeriod = Math.floor(setPeriod * 86400 * 1000 / granularity)
  const dataArray = []
  histData.forEach(item => {
    dataArray.unshift(item.close)
    if (dataArray.length > 12 * dataPointsPerPeriod) {
      Indicator.m12ema(dataArray)
    }
  })
}

module.exports = { Indicator }
