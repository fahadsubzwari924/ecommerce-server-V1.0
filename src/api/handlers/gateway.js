"use strict";


import { generateResponse, parseBody, generateApiKey } from "../../utilities";
import { saveGateway, findAllGateway, findGatewayById, editGateway, checkForGatewayByCode, removeGateway, checkGatewayForApartment, checkGatewayForFloor, checkGatewayForBuilding, getGatewayObject } from "../../models/gateway";
import { findConfiguration } from "../../models/configuration";


export async function addGateway(req, res) {
  try {
    let body = parseBody(req)
    if (body) {
      body.apiKey = await generateApiKey()
      let resp = await saveGateway(body)
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

export async function getAllGateways(req, res) {
  try {
    let gateways = await findAllGateway()
    if (gateways) {
      generateResponse(gateways.success, gateways.message, gateways.data, res)
    }
  }
  catch (err) {
    generateResponse(false, 'Error occured, 404 not found!', err, res)
  }
}

export async function getGatewayById(req, res) {
  try {
    let id = req.params.id
    let gateway = await findGatewayById(id)
    if (gateway) {
      generateResponse(gateway.success, gateway.message, gateway.data, res)
    }
  }
  catch (err) {
    generateResponse(false, 'Error occured, 404 not found!', err, res)
  }
}

export async function updateGateway(req, res) {
  try {
    let body = parseBody(req)
    if (body) {
      body.updatedAt = Date.now()
      let gateway = await editGateway(body)
      if (gateway) {
        generateResponse(gateway.success, gateway.message, null, res)
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

export async function deleteGateway(req, res) {
  let id = req.params.id
  if (id) {
    let gateway = await removeGateway(id)
    if (gateway) {
      generateResponse(gateway.success, gateway.message, gateway.data, res)
    }
  }
}

export async function checkGateway(req, res) {
  let body = parseBody(req)
  if (body) {
    if (body.apartmentId) {
      let gateway = await checkGatewayForApartment(body.apartmentId)
      if (gateway) {
        generateResponse(gateway.success, gateway.message, gateway.data, res)
      }
    }
    else if (body.floorId) {
      let gateway = await checkGatewayForFloor(body.floorId)
      if (gateway) {
        generateResponse(gateway.success, gateway.message, gateway.data, res)
      }
    }
    else if (body.buildingId) {
      let gateway = await checkGatewayForBuilding(body.buildingId)
      if (gateway) {
        generateResponse(gateway.success, gateway.message, gateway.data, res)
      }
    }
    else {
      generateResponse(false, "Can't check gateway", null, res)
    }
  }
  else {
    generateResponse(false, "Please provide complete info", null, res)
  }
}

export async function fetchGatewayObject(req, res) {
  let macAddress = parseBody(req)
  if (macAddress) {
    let gatewayObj = await getGatewayObject(macAddress)
    if (gatewayObj) {
      let configuration = await findConfiguration()
      if (configuration) {
        let result = {
          gatewayObj : gatewayObj,
          configuration : configuration
        }
        generateResponse(true, "Gateway details fetched", result, res)
      }
      else {
        generateResponse(false,"No configuration found",null,res)
      }
    }
    else {
      generateResponse(false, "No gateway found", null, res)
    }
  }
  else {
    generateResponse(false, "Please provide complete info", null, res)
  }
}


