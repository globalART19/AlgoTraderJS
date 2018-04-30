const express = require('express')
const router = express.Router()
const { db } = require('../models')
const { main } = require('../views')

router.get('/', async (req, res, next) => {
  try {
    res.send(main(`Just starting to get these pages set up and whatnot. But it's here so that rocks!`))
  } catch (e) {
    next(e)
  }
})

module.exports = router

