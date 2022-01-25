const {Product, Shop} = require('../models/index.js')

const productAuthorization = async (req,res,next)=>{
  try {
    const {productId} = req.params;
    const product = await Product.findByPk(productId)
    if(!product) {
      throw {name: "PRODUCT_NOT_FOUND"}
    }

    const shop = await Shop.findOne({
      where:{
        userId : req.currentUser.userId
      }
    })

    if(!shop || +product.shopId !== +shop.id){
      throw {name: "FORBIDDEN"}
    }

    next()
  } catch (error) {
    next(error)
  }
}

module.exports = {
  productAuthorization
}