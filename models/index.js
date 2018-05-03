const { promisify } = require('util');
const Sequelize = require('sequelize')
const db = new Sequelize('postgres:localhost:5432/algoTraderJS', { logging: false })
const Gdax = require('gdax')
const publicClient = new Gdax.PublicClient()


async function dbAuthenticator() {
  await db.authenticate().then(() => { console.log('Connected to algoTraderJS database') })
}

dbAuthenticator()

const User = db.define('users', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

const UserTrade = db.define('usertrades', {
  tradeId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  size: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  productId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  side: {
    type: Sequelize.STRING,
    allowNull: false
  },
  stp: {
    type: Sequelize.STRING,
    allowNull: false
  },
  tradeType: {
    type: Sequelize.STRING,
    allowNull: false
  },
  timeInForce: {
    type: Sequelize.STRING,
    allowNull: false
  },
  postOnly: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  tradeCreatedAt: {
    type: Sequelize.STRING,
    allowNull: false
  },
  fillFees: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  filledSize: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  executedValue: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  tradeStatus: {
    type: Sequelize.STRING,
    allowNull: false
  },
  settled: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  sentTrade: {
    type: Sequelize.JSON,
    allowNull: false
  }
})

UserTrade.belongsTo(User, { as: 'userTrade' })

UserTrade.beforeValidate((tradeObj) => {
  tradeObj.price = +tradeObj.price
  tradeObj.size = +tradeObj.size
  tradeObj.fillFees = +tradeObj.fillFees
  tradeObj.filledSize = +tradeObj.filledSize
  tradeObj.executedValue = +tradeObj.executedValue
})

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
  }
})

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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
    if (![60, 300, 900, 3600, 21600, 86400].includes(granularity)) { throw 'Bad granularity' }
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
    await Promise.all(flatBulkUpdateArray.map(elem => {
      let historicalDataInstance = {
        histTime: elem[0],
        low: elem[1],
        high: elem[2],
        open: elem[3],
        close: elem[4],
        volume: elem[5]
      }
      HistoricalData.create(historicalDataInstance)
    }))
    await HistoricalData.findAll()
    console.log('data push success')
  } catch (e) {
    console.error('Failed db push', e)
  }
}

const Order = db.define('orders', {
  orderType: {
    type: Sequelize.STRING,
    allowNull: false
  },
  tradeId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  sequence: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  makerOrderId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  takerOrderId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  time: {
    type: Sequelize.DATE,
    allowNull: false
  },
  productId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  size: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  side: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

Order.beforeValidate((order) => {
  order.time = Date(order.time)
  order.size = +order.size
  order.price = +order.price
})

module.exports = { db }
