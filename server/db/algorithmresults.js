const db = require('./db')
const Sequelize = require('sequelize')
const { calcAlgoReturn } = require('../datamanipulation/algorithm')
const { HistoricalData } = require('../db/historicaldata')

const AlgorithmResults = db.define('algorithmresults', {
  maxReturn: Sequelize.INTEGER,
  algoReturn: Sequelize.INTEGER
})

AlgorithmResults.calcReturns = async function () {
  console.log('calcResults start')
  const maxReturn = await AlgorithmResults.calcMaxReturn()
  const algoReturn = await calcAlgoReturn()
  console.log('AlgoResults: ', maxReturn, algoReturn)
  AlgorithmResults.create({ maxReturn, algoReturn })
}

AlgorithmResults.calcMaxReturn = async function () {
  const histData = await HistoricalData.findAll({ attributes: ['histTime', 'close'], order: [['histTime', 'ASC']] })
  console.log(histData[0].dataValues.close)
  let lastSell = histData[0].dataValues.close
  let prevVal = firstVal
  let curQty = 1
  let firstDecline = true
  const maxReturn = histData.reduce((acc, curTick) => {
    const curVal = curTick.dataValues.close
    const delta = curVal - prevVal
    if (delta > 0) {
      prevVal = curVal
      firstDecline = true
      return acc + delta * curQty
    }
    if (firstDecline) {
      firstDecline = false
      curQty = curQty * prevVal / lastSell
      prevVal = curVal
    }
    return acc
  }, 0)
  console.log(maxReturn)
  return maxReturn
}

module.exports = { AlgorithmResults }