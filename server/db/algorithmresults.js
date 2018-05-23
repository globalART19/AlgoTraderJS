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
  let curQty = 1
  let curBank = 0
  let tick = 0
  while (histData[tick + 1]) {
    let curVal = histData[tick].dataValues.close
    let nextVal = histData[tick + 1].dataValues.close
    //buy condition
    if (nextVal > curVal && curQty === 0) {
      curQty = curBank / curVal
      curBank = 0
      //set buy marker
    }
    //sell condition
    if (nextVal < curVal && curQty > 0) {
      curBank = curVal * curQty
      curQty = 0
      //set sell marker
    }
  }
  const lastVal = histData[histData.length - 1].dataValues.close
  if (curQty > 0) curBank = lastVal * curQty
  console.log(curBank)
  return curBank
}

module.exports = { AlgorithmResults }