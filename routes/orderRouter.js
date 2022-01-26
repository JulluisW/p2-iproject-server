const express = require('express');
const orderRouter = express.Router()
const {Order, Shop} = require('../models/index.js')

orderRouter.post('/add', async(req,res,next)=>{
  try {
    const {customerName, orderDestination, customerPhoneNumber,totalPrice} = req.body

    const shop = await Shop.findOne({
      where: {
        userId : req.currentUser.userId
      }
    })

    const resp = await Order.create({
      customerName, 
      orderDestination, 
      customerPhoneNumber,
      totalPrice,
      status: "pending",
      shopId : shop.id
    })

    res.status(201).json(resp)
  } catch (error) {
    next(error)
  }
})

orderRouter.get('/', async(req,res,next)=>{
  try {
    const shop = await Shop.findOne({
      where: {
        userId : req.currentUser.userId
      }
    })

    const resp = await Order.findAll({
      where: {
        shopId: shop.id,
        status: "pending"
      }
    })

    res.status(200).json(resp)
  } catch (error) {
    next(error)
  }
})

module.exports= orderRouter