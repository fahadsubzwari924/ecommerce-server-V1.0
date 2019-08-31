"use strict";


import { generateResponse, parseBody } from "../../utilities";
import { saveFloor, findAllFloor, findFloorById, editFloor, findAllFloorsOfBuilding, checkFloor, removeFloor, saveAllFloors, deleteFloors } from "../../models/floor";


export async function addFloor(req, res) {
  try {
    let body = parseBody(req)
    if (body) {
      let floor = await saveFloor(body)
      if (floor) {
        generateResponse(floor.success, floor.message, floor.data, res)
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

export async function getAllFloors(req, res) {
  try {
    let floors = await findAllFloor()
    if (floors) {
      generateResponse(floors.success, floors.message, floors.data, res)
    }
  }
  catch (err) {
    generateResponse(false, 'Error occured, 404 not found!', err, res)
  }
}

export async function getFloorById(req, res) {
  try {
    let id = req.params.id
    let floor = await findFloorById(id)
    if (floor) {
      generateResponse(floor.success, floor.message, floor.data, res)
    }
  }
  catch (err) {
    generateResponse(false, 'Error occured, 404 not found!', err, res)
  }
}

export async function updateFloor(req, res) {
  try {
    let body = parseBody(req)
    if (body) {
      body.updatedAt = Date.now()
      let floor = await editFloor(body)
      if (floor) {
        generateResponse(floor.success, floor.message, null, res)
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

export async function getAllFloorsOfBuilding(req, res) {
  try {
    let buildingId = req.params.id
    if (buildingId) {
      let floor = await findAllFloorsOfBuilding(buildingId)
      if (floor) {
        generateResponse(floor.success, floor.message, floor.data, res)
      }
    }
    else {
      generateResponse(false, "Please provide buildingId", null, res)
    }
  }
  catch (err) {
    generateResponse(false, 'Error occured, 404 not found!', err, res)
  }
}

// export async function deleteFloor(req, res) {
//   try {
//     let id = req.params.id
//     if (id) {
//       let floor = await removeFloor(id)
//       if (floor) {
//         generateResponse(floor.success, floor.message, floor.data, res)
//       }
//     }
//   }
//   catch (err) {
//     generateResponse(false, 'Error occured, 404 not found!', err, res)
//   }

// }

export async function addFloorsOfBuilding(req,res){
  let body = parseBody(req)
  if(body){
    let floor = await saveAllFloors(body)
    if(floor){
      generateResponse(true,"Floors added successfully",null,res)
    }
    else{
      generateResponse(false,"Unable to add floors",null,res)
    }
  }
  else{
    generateResponse(false,"Please provide complete info",null,res)
  }
}

export async function removeAllDataOfFloor(req, res) {
  let id = req.params.id
  if (id) {
    let floor = await deleteFloors(id)
    if (floor) {
      generateResponse(floor.success, floor.message, floor.data, res)
    }
  }
  else {
    generateResponse(false, "Please provide complete info", null, res)
  }
}