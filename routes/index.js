const express = require('express')
const indexRouter = express.Router()
const userRouter = require('./userRouter.js')
const shopRouter = require('./shopRouter.js')
const productRouter = require("./productRouter.js")
const Authentication = require('../Middlewares/Authentication.js')

indexRouter.use('/', userRouter)

indexRouter.use(Authentication)

indexRouter.use('/shop', shopRouter)
indexRouter.use('/product', productRouter)

module.exports = indexRouter