var mongoose = require("mongoose");
import config from "../conf/index";
const Cryptr = require('cryptr');
import { sign } from "jsonwebtoken";
var Schema = mongoose.Schema;

// secrect key of encryption
const cryptr = new Cryptr('uemployeelocaitonmonitoringsystemu');

var User = mongoose.model(
  "users",
  new Schema({
    name: String,
    email: String,
    password: String,
    mobileNumber : String,
    dateOfBirth : Date,
    isAdmin : Boolean,
    token: String,
    roleId: { type: Schema.Types.ObjectId, ref: "roles" },
    createdAt: String,
    updatedAt: String,
    tempToken : String,
    isActive: { type: Boolean, default: true }
  })
);


export async function saveUser(obj) {
  let chk = await User.find({ 'email': obj.email })
  if (chk.length == 0) {
    let hashVal = cryptr.encrypt(obj.password)
    if (hashVal) {
      obj.password = hashVal
      let userObj = new User(obj)
      let user = await userObj.save()
      return ({ success: true, message: "User added", data: user })
    }
    else {
      return ({ success: false, message: "Error in hashing password" })
    }
  }
  else {
    return ({ success: false, message: "Already Exist", data: null })
  }
}

export async function findAllUser() {

  let users = await User.find({}).populate('roleId').exec()
  return users
}

export async function findUserById(id) {
  let users = await User.findById(id).populate('roleId').exec()
  let pass = cryptr.decrypt(user.password)
  users.password = pass
  return users 
}

export async function editUser(body) {
  let id = body.id
  if(body.password){
    let hashVal = cryptr.encrypt(body.password)
    body.password = hashVal
    let users = await User.updateOne(
    { _id: id },
    { $set: body })
    return users
  }
  else{
    let users = await User.updateOne(
      { _id: id },
      { $set: body })
      return users
  }
  
}

export async function loginUsers(obj) {
  var expiry
  let details = await User.findOne({ "email": obj.email }).populate('roleId')
  if (details) {
    if (obj.rememberme == false) {
      expiry = '24h'
    }
    else if (obj.rememberme == true) {
      expiry = '1y'
    }
    let plainConvertedPassword = cryptr.decrypt(details.password)
    let validation = plainConvertedPassword == obj.password ? true : false
    if (validation) {
      let tokenObj = {
        id: details._id,
        name: details.name,
        email: details.email,
        role: details.roleId.slug
      }
      let token = await sign(
        {
          user: tokenObj
        },
        `${config.app["jwtsecret"]}`,
        {
          expiresIn: expiry
        })

      details.token = token

      let updateUser = await User.updateOne({ _id: details._id }, { $set: { token: token } })
      if (updateUser) {
        return ({ success: true, message: "User LoggedIn Successfully", data: details })
      }
      else {
        return ({ success: true, message: "Can't Log In", data: null })
      }
    }
    else {
      return ({ success: false, message: "Password Incorrect", data: null })
    }
  }
  else {
    return ({ success: false, message: "No User Found", data: null })
  }
}

export async function forgetPassword(body){
  let details = await User.findOne({email : body.email}).exec()
  if(details){
    let tokenObj = {
      _id : details._id,
      name : details.name,
      email : details.email
    }
    let token = await sign(
      {
        user: tokenObj
      },
      `${config.app["jwtsecret"]}`,
      {
        expiresIn: 180
      })
    let updateObj = await User.updateOne({_id: details._id},{ $set: { tempToken: token } })
    if(updateObj){
      return token
    }
  }
  else{
    return ({ success: false, message: "No User Found", data: null }) 
  }
}

export async function changePassword(body){
  let user = await User.findOne({email : body.token}).exec()
  if(user){
    let hashVal = cryptr.encrypt(body.password)
    let password = await User.updateOne({email : body.token},{$set : {password : hashVal}})
    if(password){
      return ({success : true,message:'Password Updated',data:null})
    }
  }else{
    return ({success : true,message:'Can not change password',data:null})
  }
}