const { VerifyToken } = require("../helper/helpers");
const { User } = require('../models/index.js')


const Authentication = async(req,res,next)=>{
  try {
    const {access_token} = req.headers;
    const payload  = VerifyToken(access_token);

    const user = await User.findByPk(payload.id);

    if(!user){
      throw {name:"INVALID_TOKEN"}
    }

    req.currentUser = {
      userId: user.id,
      email: user.email
    }
    
    next()

  } catch (error) {
    next(error)
  }
}

module.exports = Authentication