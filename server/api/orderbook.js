const router = require('express').Router()
const { db } = require('../db')
const Gdax = require('gdax')
const orderbookSync = new Gdax.OrderbookSync(['BTC-USD'])
const { BigNumber } = require('bignumber.js')

router.get('/', (req, res, next) => {
  try {
    res.send('/Get dat orderbook')
  } catch (e) {
    next(e)
  }
})

router.post('/', (req, res, next) => {
  try {
    res.send("You posted some stuff...I get it")
  } catch (e) {
    next(e)
  }
})

router.get('/chart', (req, res, next) => {
  try {
    let curState = orderbookSync.books['BTC-USD'].state()
    let chartData = [['Price ($)', 'Asks (qty)', 'Bids (qty)']]
    let curPrice = curState.asks[0].price.toNumber()
    let prevAskSize = 0
    curState.asks.map(ask => {
      if (ask.price.toNumber() < curPrice + 1500) {
        chartData.push([ask.price.toNumber(), ask.size.toNumber() + prevAskSize, null])
        prevAskSize += ask.size.toNumber()
      }
    })
    let prevBidSize = 0
    curState.bids.map(bid => {
      if (bid.price.toNumber() > curPrice - 1500) {
        chartData.push([bid.price.toNumber(), null, bid.size.toNumber() + prevBidSize])
        prevBidSize += bid.size.toNumber()
      }
    })
    console.log(chartData)
    res.json(JSON.stringify(chartData))
  } catch (e) {
    next(e)
  }
})

module.exports = router
