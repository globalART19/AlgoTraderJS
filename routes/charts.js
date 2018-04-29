const express = require('express')
const router = express.Router()
const { db } = require('../models')
const { charts } = require('../views')

router.get('/', async (req, res, next) => {
  try {
    res.send(charts('Charts Page!'))
  } catch (e) {
    next(e)
  }
})

module.exports = router
