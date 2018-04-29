const express = require('express')
const router = express.Router()
const { db } = require('../models')
const { orderBook } = require('../views')

router.get('/', async (req, res, next) => {
  try {
    res.send(orderBook('Order Book Page!'))
  } catch (e) {
    next(e)
  }
})

module.exports = router
