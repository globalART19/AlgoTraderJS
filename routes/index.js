const express = require('express')
const router = express.Router()
const main = require('./main')
const user = require('./user')

router.use('/main', main)
router.use('/user', user)

module.exports = { main }
