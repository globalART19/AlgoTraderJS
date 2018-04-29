const express = require('express')
const router = express.Router()
const { db } = require('../models')
const { main } = require('../views')

router.get('/', async (req, res, next) => {
  try {
    res.send(main('Starting Up!'))
  } catch (e) {
    next(e)
  }
})

module.exports = router
