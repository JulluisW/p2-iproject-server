const express = require('express')
const productRouter = express.Router()
const {Product} = require('../models/index.js')

productRouter.post('/add', async(req,res,next) => {
  try {
    const {name, description, price, bulkPrice, brand, shopId} = req.body;

    Product.create({
      name,
      description,
      price,
      bulkPrice,
      brand,
      shopId,
    })
  } catch (error) {
    next(error)
  }
})

module.exports = productRouter