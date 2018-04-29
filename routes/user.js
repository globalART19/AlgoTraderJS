const express = require('express')
const router = express.Router()
const { db } = require('../models')
const { user } = require('../views')

router.get('/', async (req, res, next) => {
  try {
    res.send(user('User Page!'))
  } catch (e) {
    next(e)
  }
})

module.exports = router
