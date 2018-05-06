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
  const mPeriod = 1; //in days
  // const granularity = HistoricalData.findById(2).histTime - HistoricalData.findById(1).histTime
  const histData = await HistoricalData.findAll()
  const granularity = histData
  console.log(histData)
}

module.exports = { Indicator }
