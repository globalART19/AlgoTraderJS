const db = require('./db')
const { User, UserTrade } = require('./user')
const { HistoricalData } = require('./historicaldata')
const { Indicator } = require('./indicator')
const { Order } = require('./orderbook')

async function dbAuthenticator() {
  await db.authenticate().then(() => { console.log('Connected to algoTraderJS database') })
}
dbAuthenticator()

UserTrade.belongsTo(User, { as: 'userTrade' })

Indicator.belongsTo(HistoricalData)
HistoricalData.hasOne(Indicator)

module.exports = { db, User, UserTrade, HistoricalData, Indicator, Order }
