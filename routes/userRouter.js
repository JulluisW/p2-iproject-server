const express = require('express')
const { CompareHash, SignToken } = require('../helper/helpers.js')
const userRouter = express.Router()
const {User} = require('../models/index.js')
const axios = require('axios')

const AbstractSecretAPIKey = process.env.ABSTRACT_PHONE_VALIDATOR_API_KEY;

userRouter.post('/register', async (req, res, next) => {
  try {
    const {email, password, phoneNumber} = req.body
    const newUser = await User.create({
      email: email,
      password: password,
      phoneNumber:phoneNumber,
    })

    res.status(201).json({
      id: newUser.id,
      email: newUser.email
    })

  } catch (error) {
    // console.log(error);
    next(error)
  }
})

userRouter.post('/login', async (req,res,next) => {
  try {
    const {email, password} = req.body;
    if(!email) {
      throw {name: "EMAIL_EMPTY"}
    }
    if(!password) {
      throw {name: "PASSWORD_EMPTY"}
    }
    const user = await User.findOne({
      where: {
        email:email
      }
    })
    console.log(user);
    if(!user || !CompareHash(password, user.password)) {
      throw {name: "INVALID_EMAIL_PASSWORD"}
    }
    let payload = {
      id: user.id
    }
    res.status(200).json({
      access_token: SignToken(payload)
    })
    
  } catch (error) {
    next(error)
  }
})

userRouter.post('/register/phoneValidations', async(req,res,next) => {
  try {
    const {phone} = req.body
    let endpoint = `https://phonevalidation.abstractapi.com/v1/?api_key=${AbstractSecretAPIKey}&phone=`
    
    endpoint = endpoint + phone

    const resp = await axios.get(endpoint)
    if(!resp.data.valid){
      throw {name:"PHONE_INVALID"}
    }

    res.status(200).json(resp.data)
  } catch (error) {
    next(error)
  }
})

module.exports = userRouter