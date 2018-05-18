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
  let prevVal = histData[0].dataValues.close
  const maxReturn = histData.reduce((acc, curVal) => {
    const delta = curVal.dataValues.close - prevVal
    prevVal = curVal.dataValues.close
    console.log('accumulator', acc)
    return delta > 0 ? acc + delta : acc
  }, 0)
  console.log(maxReturn)
  return maxReturn
}

module.exports = { AlgorithmResults }