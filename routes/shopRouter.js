const express = require('express')
const shopRouter = express.Router()
const {Shop} = require('../models/index.js')


shopRouter.post('/register', async(req,res,next)=>{
  try {
    const {name, imageUrl, motto, address, category} = req.body

    const newShop = await Shop.create({
      name : name,
      imageUrl : imageUrl,
      motto : motto,
      address : address,
      category : category,
      userId: req.currentUser.userId,
    })

    res.status(201).json(newShop)
  } catch (error) {
    console.log(error);
    next(error)
  }
})

shopRouter.get('/:userId', async(req,res,next)=>{
  try {
    const {userId} = req.params
    const resp = await Shop.findOne({
      include:["User"],
      where: {
        userId
      }
    })
    
    res.status(200).json(resp)

  } catch (error) {
    console.log(error);
    next(error)
  }
}) 

shopRouter.put('/edit', async(req,res,next) =>{
  try {
    const {name, imageUrl, motto, address, category} = req.body;

    await Shop.update({
      name,
      imageUrl,
      motto,
      address,
      category,
    },{
      where: {
        userId: req.currentUser.userId
      }
    })

    res.status(200).json({
      message: `Shop update success`
    });
  } catch (error) {
    console.log(error);
    next(error)
  }
})

module.exports = shopRouter