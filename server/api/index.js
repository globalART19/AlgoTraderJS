const router = require('express').Router()

router.use('/historicaldata', require('./historicaldata'))
router.use('/algorithm', require('./algorithm'))
router.use('/user', require('./user'))
router.use('/orderbook', require('./orderbook'))

module.exports = router
