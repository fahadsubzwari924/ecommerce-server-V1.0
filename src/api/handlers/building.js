"use strict";


import { generateResponse, parseBody } from "../../utilities";
import { saveBuilding, findAllBuilding, findBuildingById, editBuilding, findAllBuildingByName, removeBuilding, deleteBuildings } from "../../models/building";


export async function addBuilding(req, res) {
  try {
    let body = parseBody(req)
    body.createdAt = Date.now()
    body.updatedAt = Date.now()
    if (body) {
      let resp = await saveBuilding(body)
      if (resp) {
        generateResponse(resp.success, resp.message, resp.data, res)
      }
    } else {
      generateResponse(false, "Please provide complete info", null, res)
    }
  }
  catch (err) {
    generateResponse(false, 'Error occured, 404 not found!', err, res)
  }
}

export async function getAllBuildings(req, res) {
  try {
    let buildings = await findAllBuilding()
    if (buildings) {
      generateResponse(buildings.success, buildings.message, buildings.data, res)
    }
  }
  catch (err) {
    generateResponse(false, 'Error occured, 404 not found!', err, res)
  }
}

export async function getBuildingById(req, res) {
  try {
    let id = req.params.id
    let building = await findBuildingById(id)
    if (building) {
      generateResponse(building.success, building.message, building.data, res)
    }
  }
  catch (err) {
    generateResponse(false, 'Error occured, 404 not found!', err, res)
  }
}

export async function updateBuilding(req, res) {
  try {
    let body = parseBody(req)
    body.updatedAt = Date.now()
    if (body) {
      let building = await editBuilding(body)
      if (building) {
        generateResponse(building.success, building.message, building.data, res)
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

export async function deleteBuilding(req, res) {
  try {
    let id = req.params.id
    if (id) {
      let building = await removeBuilding(id)
      if (building) {
        generateResponse(building.success, building.message, building.data, res)
      }
    }
    else {
      generateResponse(false, "Please provide Id", null, res)
    }
  }
  catch (err) {
    generateResponse(false, "Error occured, 404 not found!", err, res)
  }

}


export async function deleteAllBuildingData(req, res) {
  let id = req.params.id
  if (id) {
    let building = await deleteBuildings(id)
    if (building) {
      generateResponse(building.success, building.message, building.data, res)
    }
  }
  else {
    generateResponse(false, "Please provide complete info", null, res)
  }
}