const express = require('express')
const router = express.Router()
const { db } = require('../models')
const { algorithmForm } = require('../views')
const { algorithmResults } = require('../views')

router.get('/', async (req, res, next) => {
  try {
    res.send(algorithmForm('Algorithm Form Page!'))
  } catch (e) {
    next(e)
  }
})

router.get('/results', async (req, res, next) => {
  try {
    res.send(algorithmResults('Algorithm Results Page!'))
  } catch (e) {
    next(e)
  }
})

module.exports = router
