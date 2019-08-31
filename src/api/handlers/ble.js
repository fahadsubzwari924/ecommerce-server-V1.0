"use strict";


import { generateResponse, parseBody } from "../../utilities";
import { saveBLE, findAllBLE, findBLEById, editBLE, findBLEByCode, removeBLE } from "../../models/ble";


export async function addBLE(req, res) {
  try {
    let body = parseBody(req)
    if (body) {
      let resp = await saveBLE(body)
      if (resp) {
        generateResponse(resp.success, resp.message, resp.data, res)
      }
    }
    else {
      generateResponse(false, "Please provide complete info", null, res)
    }
  }
  catch (err) {
    generateResponse(false, 'Error occured, 404 not found!', err, res)
  }

}

export async function getAllBLEs(req, res) {
  try {
    let bles = await findAllBLE()
    if (bles) {
      generateResponse(bles.success, bles.message, bles.data, res)
    }
  }
  catch (err) {
    generateResponse(false, 'Error occured, 404 not found!', err, res)
  }

}

export async function getBLEById(req, res) {
  try {
    let id = req.params.id
    let ble = await findBLEById(id)
    if (ble) {
      generateResponse(ble.success, ble.message, ble.data, res)
    }
  }
  catch (err) {
    generateResponse(false, 'Error occured, 404 not found!', err, res)
  }

}

export async function updateBLE(req, res) {
  try {
    let body = parseBody(req)
    if (body) {
      body.updatedAt = Date.now()
      let ble = await editBLE(body)
      if (ble) {
        generateResponse(ble.success, ble.message, null, res)
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

export async function deleteBLE(req, res) {
 try{
  let id = req.params.id
  if (id) {
    let ble = await removeBLE(id)
    if (ble) {
      generateResponse(ble.success, ble.message, ble.data, res)
    }
  }
  else {
    generateResponse(false,"Please provide Id",null,res)
  } 
 }
 catch(err){
  generateResponse(false, 'Error occured, 404 not found!', err, res)  
 }

}