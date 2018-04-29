const Sequelize = require('sequelize')
const db = new Sequelize('postgres:localhost:5432/algoTraderJS') //can add ,{logging: false}

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
  }
})

const UserTrade = db.define('usertrades', {
  tradeId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.NUMBER,
    allowNull: false
  },
  size: {
    type: Sequelize.NUMBER,
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
  type: {
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
  createdAt: {
    type: Sequelize.STRING,
    allowNull: false
  },
  fillFees: {
    type: Sequelize.NUMBER,
    allowNull: false
  },
  filledSize: {
    type: Sequelize.NUMBER,
    allowNull: false
  },
  executedValue: {
    type: Sequelize.NUMBER,
    allowNull: false
  },
  status: {
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

UserTrade.belongsTo(User, { as: 'trade' })

// UserTrade.beforeValidate((tradeObj) => {
//   tradeObj.price = +tradeObj.price
//   tradeObj.size = +tradeObj.size
//   tradeObj.fillFees = +tradeObj.fillFees
//   tradeObj.filledSize = +tradeObj.filledSize
//   tradeObj.executedValue = +tradeObj.executedValue
// })

const HistoricalData = db.define('historicaldata', {
  time: {
    type: Sequelize.DATE,
    allowNull: false
  },
  low: {
    type: Sequelize.NUMBER,
    allowNull: false
  },
  high: {
    type: Sequelize.NUMBER,
    allowNull: false
  },
  open: {
    type: Sequelize.NUMBER,
    allowNull: false
  },
  close: {
    type: Sequelize.NUMBER,
    allowNull: false
  },
  volume: {
    type: Sequelize.NUMBER,
    allowNull: false
  }
})

// HistoricalData.beforeValidate((dataPoint) => {
//   let date = new Date(0)
//   dataPoint.time = date.setUTCSeconds(dataPoint.time)
// })


const Order = db.define('orders', {
  type: {
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
    type: Sequelize.NUMBER,
    allowNull: false
  },
  price: {
    type: Sequelize.NUMBER,
    allowNull: false
  },
  side: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

// Order.beforeValidate((order) => {
//   order.time = Date(order.time)
//   order.size = +order.size
//   order.price = +order.price
// })

module.exports = { db }
