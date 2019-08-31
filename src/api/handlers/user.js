"use strict";


import { generateResponse, parseBody } from "../../utilities";
import { saveUser, findAllUser, findUserById, editUser, loginUsers, forgetPassword, changePassword } from "../../models/user";
import { getRoleBySlug } from "./roles";
import { decodeTokenForPassword } from "../middlewares";
var nodemailer = require('nodemailer');


export async function addUser(req, res) {
  try {
    let body = parseBody(req)
    console.log(body)
    body.createdAt = Date.now()
    body.updatedAt = Date.now()
    // let role = await getRoleBySlug(body.role_id)
    // body.roleId = role._id
    
    let resp = await saveUser(body)
    if (resp) {
      generateResponse(resp.success, resp.message, resp.data, res)
    }
    else {
      generateResponse(false, "Can't add user", null, res)
    }
  }
  catch (err) {
    generateResponse(false, 'Error occured, 404 not found!', err, res)
  }
}

export async function getAllUsers(req, res) {
  try {
    let Users = await findAllUser()
    if (Users) {
      generateResponse(true, "All Users fetched", Users, res)
    }
    else {
      generateResponse(false, "No Users found", null, res)
    }
  }
  catch (err) {
    generateResponse(false, 'Error occured, 404 not found!', err, res)
  }
}

export async function getUserById(req, res) {
  try {
    let id = req.params.id
    let User = await findUserById(id)
    if (User) {
      generateResponse(true, "User fetched", User, res)
    }
    else {
      generateResponse(false, "Can't find User", null, res)
    }
  }
  catch (err) {
    generateResponse(false, 'Error occured, 404 not found!', err, res)
  }
}

export async function updateUser(req, res) {
  try {
    let body = parseBody(req)
    if (body) {
      body.updatedAt = Date.now()
      let User = await editUser(body)
      if (User) {
        generateResponse(true, "User updated", User, res)
      }
      else {
        generateResponse(false, "Can't update User", null, res)
      }
    }
    else {
      generateResponse(false, "Please give complete info", null, res)
    }
  }
  catch (err) {
    generateResponse(false, 'Error occured, 404 not found!', err, res)
  }
}

export async function loginUser(req, res) {
  try {
    let body = parseBody(req)
    if (body.email && body.password) {
      let loggIn = await loginUsers(body)
      if (loggIn) {
        generateResponse(loggIn.success, loggIn.message, loggIn.data, res)
      }
      else {
        generateResponse(false, "Unable to loggIn", null, res)
      }
    }
    else {
      generateResponse(false, "Please Provide Complete Info", null, res)
    }
  }
  catch (err) {
    generateResponse(false, 'Error occured, 404 not found!', err, res)
  }
}


export async function resetPassword(req, res) {
  try {
    let body = parseBody(req)
    let passObj = await forgetPassword(body)
    if (passObj) {
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
          user: 'fahadsubzwari924@gmail.com',
          pass: 'Jumpshare__1'
        }
      });

      const mailOptions = {
        from: 'fahadsubzwari924@gmail.com', // sender address
        to: 'syedbilal1349@gmail.com', // list of receivers
        subject: 'Password Reset Link', // Subject line
        html: `<p>Your password reset link is</p>
        <a href="http://employee-monitoring-system.s3-website.eu-central-1.amazonaws.com/auth/forgot/password/${passObj}">http://employee-monitoring-system.s3-website.eu-central-1.amazonaws.com/auth/forgot/password/${passObj}</a>`// plain text body
      };
      transporter.sendMail(mailOptions, function (err, info) {
        console.log('in send mail function');
        if (!err) {
          console.log('mail send')
          generateResponse(true, "Password reset link sent", mailOptions, res)
        }
        else {
          generateResponse(false, "Can't send mail", null, res)
        }
      });
    }
    else {
      generateResponse(false, "Can't reset password", null, res)
    }
  }
  catch (err) {
    generateResponse(false, "Error Occurred! 404 not found", null, res)
  }
}

export async function changePasswordOfUser(req,res){
  let body = parseBody(req)
  if(body){
  let tokenObj = await decodeTokenForPassword(body.token)
  if(tokenObj != null){
    body.token = tokenObj.user.email
    let passObj = await changePassword(body)
    if(passObj){
      generateResponse(passObj.success,passObj.message,passObj.data,res)
    }
  }else{
    generateResponse(false,"Token Expired",null,res)
  }
}
else{
  generateResponse(false,"Please provide complete info",null,res)
}
}

