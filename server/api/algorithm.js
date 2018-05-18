const router = require('express').Router()
const { AlgorithmResults } = require('../db')

router.get('/', async (req, res, next) => {
  try {
    const mostRecentResults = await AlgorithmResults.findOne({ order: [['createdAt', 'DESC']] })
    res.json(mostRecentResults)
  } catch (e) {
    next(e)
  }
})

router.post('/', async (req, res, next) => {
  try {
    await AlgorithmResults.calcReturns()
    res.sendStatus(201)
  } catch (e) {
    next(e)
  }
})

module.exports = router
