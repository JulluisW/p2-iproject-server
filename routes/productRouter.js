const express = require('express');
const { productAuthorization } = require('../Middlewares/Authorization.js');
const productRouter = express.Router()
const {Product} = require('../models/index.js')

productRouter.post('/add', async(req,res,next) => {
  try {
    const {name, description, price, bulkPrice, brand, shopId} = req.body;

    const newProduct = await Product.create({
      name,
      description,
      price,
      bulkPrice,
      brand,
      shopId,
    })
    res.status(201).json(newProduct)
  } catch (error) {
    next(error)
  }
})

productRouter.put('/:productId',productAuthorization,async(req,res,next) => {
  try {
    const {name, description, price, bulkPrice, brand} = req.body;
    const {productId} = req.params;

    await Product.update({
      name,
      description,
      price,
      bulkPrice,
      brand,
    },{
      where: {
        id: productId
      }
    })
    res.status(200).json({
      message: "Product update success!"
    })
  } catch (error) {
    next(error)
  }
})

productRouter.delete('/:productId',productAuthorization,async(req,res,next)=>{
  try {
    const {productId} = req.params;
    await Product.destroy({
      where:{
        id: productId
      }
    })
    res.status(200).json({
      message: "Product has been deleted"
    })
  } catch (error) {
    next(error)
  }
})

module.exports = productRouter