const express = require("express");
const indexRouter = express.Router();
const userRouter = require("./userRouter.js");
const shopRouter = require("./shopRouter.js");
const orderRouter = require("./orderRouter")
const productRouter = require("./productRouter.js");
const Authentication = require("../Middlewares/Authentication.js");

const {Order} = require('../models/index')

indexRouter.use("/", userRouter);

indexRouter.get("/callback", async (req, res, next)=>{
  try {
    const {transaction_status, order_id} = req.query;
    let orderId = "";
    
    for(let i = 0; i < order_id.length; i++){
      if(order_id[i] != '-') {
        orderId += String(order_id[i])
      } else {
        break
      }
    }

    const result = await Order.update({
      status: transaction_status
    },{
      where: {
        id: +orderId
      }
    })

    res.redirect('https://e-bon-iproject.web.app/')
  } catch (error) {
    next(error)
  }
})

indexRouter.use(Authentication);

indexRouter.use("/order", orderRouter)
indexRouter.use("/shop", shopRouter);
indexRouter.use("/product", productRouter);

indexRouter.post("/payment", async (req, res, next) => {
  try {
    const {orderId, amount} = req.body;
    const midtransClient = require('midtrans-client');
// Create Snap API instance
let snap = new midtransClient.Snap({
        isProduction : false,
        serverKey : 'SB-Mid-server-XID8uyiCZq1nQ9W10a9EgfPs',
        clientKey : 'SB-Mid-client-KtHGR64QwUz4v5zk'
    });

let parameter = {
    "transaction_details": {
        "order_id": orderId,
        "gross_amount": amount
    }, "credit_card":{
        "secure" : true
    }
};


const result = await snap.createTransaction(parameter)
// console.log(result);
    // .then((transaction)=>{
    //     // transaction token
    //     let transactionToken = transaction.token;
    //     console.log('transactionToken:',transactionToken);
    // })
    res.status(200).json(result)
    
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = indexRouter;
