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

HistoricalData.updateIndicators = async function (period, granularity) {
  try {
    const dataArray = await HistoricalData.findAll()
    const histDataArray = dataArray.map((instance) => {
      return [instance.dataValues.htime, instance.dataValues.low, instance.dataValues.high, instance.dataValues.open, instance.dataValues.close, instance.dataValues.volume]
      // const instanceArray = Object.keys(instance.dataValues).map((key) => {
      //   return instance.dataValues[key]
      // })
      // instanceArray.shift()
      // instanceArray.pop()
      // instanceArray.pop()
      // return instanceArray
    })
    const calculatedArray = calculateIndicators(histDataArray, period, granularity)
    console.log(calculatedArray)
    const objectifiedArray = calculatedArray.map(elem => {
      return {
        histTime: elem[0],
        low: elem[1],
        high: elem[2],
        open: elem[3],
        close: elem[4],
        volume: elem[5],
        m12ema: elem[6],
        m26ema: elem[7],
        mave: elem[8],
        msig: elem[9],
        rsi: elem[10]
      }
    })
    // await HistoricalData.bulkCreate(objectifiedArray)
    console.log('calculate indicators success')
    return objectifiedArray
  } catch (e) {
    console.error('Failed db updateIndicators', e)
  }
}

HistoricalData.importHistory = async function (product, startDate, endDate, granularity, period, forceUpdate = false) {
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
    // const calculatedArray = calculateIndicators(flatBulkUpdateArray, granularity, period)
    const objectifiedArray = flatBulkUpdateArray.map(elem => {
      return {
        histTime: elem[0],
        low: elem[1],
        high: elem[2],
        open: elem[3],
        close: elem[4],
        volume: elem[5],
        //     m12ema: elem[6],
        //     m26ema: elem[7],
        //     mave: elem[8],
        //     msig: elem[9],
        //     rsi: elem[10]
      }
    })
    await HistoricalData.bulkCreate(objectifiedArray)
    console.log('data push success')
  } catch (e) {
    console.error('Failed db push', e)
  }
}

module.exports = { HistoricalData }
