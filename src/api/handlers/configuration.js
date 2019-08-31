"use strict";


import { generateResponse, parseBody } from "../../utilities";
import { saveConfiguration, findConfiguration, editConfiguration } from "../../models/configuration";


export async function addConfiguration(req, res) {
  try{
  let body = parseBody(req)
  if(body){
      body.createdAt = Date.now()
      body.updatedAt = Date.now()
      let resp = await saveConfiguration(body)
      if (resp) {
        generateResponse(true, "Configuration added", resp, res)
      }
      else {
        generateResponse(false, "Unable to save configuration", null, res)
      }
    }
    else{
      generateResponse(false,"Please provide complete info",null,res)
    }
  }
catch(err){
  generateResponse(false,'Error occured, 404 not found!',err,res)
}
}

export async function getConfiguration(req, res) {
  try{
  let resp = await findConfiguration()
  if (resp) {
    generateResponse(true, "Configuration fetched", resp, res)
  }
  else {
    generateResponse(false, "No configuration found", null, res)
  }
}
catch(err){
  generateResponse(false,'Error occured, 404 not found!',err,res)
}
}


export async function updateConfiguration(req,res) {
  try{
  let body = parseBody(req)
  if (body) {
    body.updatedAt = Date.now()
    let configuration = await editConfiguration(body)
    if(configuration){
      generateResponse(true,"Configuration updated",null,res)
    }
    else{
      generateResponse(false,"Can't update configuration",null,res)
    }
  }
  else {
    generateResponse(false, "Please give complete info", null, res)
  }
}
catch(err){
  generateResponse(false,'Error occured, 404 not found!',err,res)
}
}
