const db = require('./db')
const Sequelize = require('sequelize')
const { promisify } = require('util')
const { sleep } = require('./helperfunctions')
const calculateIndicators = require('../datamanipulation/historicaldatacalc')
const Gdax = require('gdax')
const publicClient = new Gdax.PublicClient()

const HistoricalData = db.define('historicaldata', {
  histTime: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  low: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  high: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  open: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  close: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  volume: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  m12ema: Sequelize.INTEGER,
  m26ema: Sequelize.INTEGER,
  mave: Sequelize.INTEGER,
  msig: Sequelize.INTEGER,
  rsi: Sequelize.INTEGER
})

const getHistoricalAPIData = async (product, startSetTime, endSetTime, granularity) => {
  let startISOTime = new Date(startSetTime).toISOString().replace('Z', '000Z')
  let endISOTime = new Date(endSetTime).toISOString().replace('Z', '000Z')
  let dataArray = publicClient.getProductHistoricRates(
    product,
    {
      start: startISOTime,
      end: endISOTime,
      granularity: granularity,
    })
  return dataArray
}

HistoricalData.importHistory = async function (product, startDate, endDate, granularity, forceUpdate = false) {
  const bulkUpdateArray = []
  try {
    if (![60, 300, 900, 3600, 21600, 86400].includes(granularity)) { throw new Error('Bad granularity') }
    let startSetTime = startDate.getTime()
    let endSetTime = endDate.getTime()
    const granMS = granularity * 1000
    if ((endDate.getTime() - startDate.getTime()) / granMS > 300) {
      endSetTime = startSetTime + 299 * granMS
    }
    let count = 0
    while (endSetTime <= endDate.getTime() || count === 0) {
      let dataArray = await getHistoricalAPIData(product, startSetTime, endSetTime, granularity)
      await sleep(500)
      bulkUpdateArray.push([...dataArray])
      startSetTime = endSetTime + granMS
      endSetTime += 300 * granMS
      count++
      console.log('count', count, 'startSetTime', startSetTime, 'endSetTime', endSetTime, 'endDate', endDate.getTime())
    }
  } catch (e) {
    console.error('Invalid importHistory (probably date format)', e)
  }
  try {
    console.log('Data push started')
    const flatBulkUpdateArray = [].concat.apply([], bulkUpdateArray)
    calculateIndicators(flatBulkUpdateArray)
    const objectifiedArray = flatBulkUpdateArray.map(elem => {
      return {
        histTime: elem[0],
        low: elem[1],
        high: elem[2],
        open: elem[3],
        close: elem[4],
        volume: elem[5],
        m12ema: elem[7],
        m26ema: elem[8],
        mave: elem[9],
        msig: elem[10],
        rsi: elem[11]
      }
    })
    await HistoricalData.bulkCreate(objectifiedArray)
    console.log('data push success')
  } catch (e) {
    console.error('Failed db push', e)
  }
}

module.exports = { HistoricalData }
