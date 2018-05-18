const db = require('./db')
const { User, UserTrade } = require('./user')
const { HistoricalData } = require('./historicaldata')
const { Indicator } = require('./indicator')
const { Order } = require('./order')
const { AlgorithmResults } = require('./algorithmresults')

async function dbAuthenticator() {
  await db.authenticate().then(() => { console.log('Connected to algoTraderJS database') })
}
dbAuthenticator()

UserTrade.belongsTo(User, { as: 'userTrade' })

module.exports = { db, User, UserTrade, HistoricalData, Indicator, Order, AlgorithmResults }
