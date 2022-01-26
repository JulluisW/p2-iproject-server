const express = require('express');
const { productAuthorization } = require('../Middlewares/Authorization.js');
const productRouter = express.Router()
const {Product, Shop} = require('../models/index.js')

productRouter.get('/', async(req,res,next)=>{
  try {
    const shop = await Shop.findOne({
      where: {
        userId : req.currentUser.userId
      }
    })

    const resp  = await Product.findAll({
      where: {
        shopId: shop.id
      }
    })
    res.status(200).json(resp);
  } catch (error) {
    
    next(error)
  }
})

productRouter.post('/add', async(req,res,next) => {
  try {
    const {name, description, price, bulkPrice, brand,imageUrl,shopId} = req.body;

    const newProduct = await Product.create({
      name,
      description,
      price,
      bulkPrice,
      brand,
      imageUrl,
      shopId,
    })
    res.status(201).json(newProduct)
  } catch (error) {
    next(error)
  }
})


productRouter.put('/:productId',productAuthorization,async(req,res,next) => {
  try {
    const {name, description, price, bulkPrice, brand,imageUrl} = req.body;
    const {productId} = req.params;

    await Product.update({
      name,
      description,
      price,
      bulkPrice,
      brand,
      imageUrl
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