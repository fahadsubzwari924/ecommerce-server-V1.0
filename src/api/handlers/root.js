"use strict";


import { generateResponse, parseBody } from "../../utilities";
import { findGatewayByCode, Gateway } from "../../models/gateway";
import { findBLEByCode } from "../../models/ble";
import { findEmployeeByBle } from "../../models/employee";
import { findAllBuilding } from "../../models/building";
import { findAllApartmentsOfBuilding, getAllApartmentsOfFloor } from "../../models/appartment";
import { saveAllRoles } from "../../models/roles";
import { addAllMenu } from "../../models/menu";
import { getAllFloorsOfBuilding } from "../../models/floor";
import { ApiKey } from "../../models/key";
import { Tracking } from "../../models/tracking";



export function DefaultHandler(req, res) {
  generateResponse(true, "Default Handler", {}, res);
}

export async function getRealTimeData(req, res) {
  let body = parseBody(req)
  let gatewayCode = body.g_c
  let cards = body.cards
  let finalCardObj = []
  if (gatewayCode && cards) {
    gatewayCode = await findGatewayByCode(gatewayCode)
    for (let i in cards) {
      let item = cards[i]
      let cardObj = await findBLEByCode(item.card)
      let card = await findEmployeeByBle(cardObj._id)
      finalCardObj.push(card.data)
    }
    let result = {
      g_c: gatewayCode.data,
      time: new Date(body.time).toLocaleString(),
      [gatewayCode.data.apartment]: finalCardObj
    }
    generateResponse(true, "Real Time Data Fetched", result, res)
  }
  else {
    generateResponse(false, "Please provide complete info", null, res)
  }
}

export async function getApartmentsOfBuilding(req, res) {
  try {
    let buildings = await findAllBuilding()
    let result = []
    let data = buildings.data
    if (data.length > 0) {
      for (let i in data) {
        let item = data[i]
        let appartment = await findAllApartmentsOfBuilding(item._id)
        result.push({ building: item, appartments: appartment.data })
      }
      generateResponse(true, "Appartments Of Buildings Fetched", result, res)
    }
    else {
      generateResponse(false, "No Building found", null, res)
    }
  }
  catch (err) {
    generateResponse(false, 'Error occured, 404 not found!', err, res)
  }
}

export async function addPreRoles(req, res) {
  let roles = await saveAllRoles()
  generateResponse(true, "Role added", roles, res)
}

export async function addPreMenu(req, res) {
  let menu = await addAllMenu()
  generateResponse(true, "Menu added", menu, res)
}

export async function getAllBuildingData(req, res) {
  let buildingId = req.params.id
  let result = []
  if (buildingId) {
    console.log(buildingId)
    let floors = await getAllFloorsOfBuilding(buildingId)
    if (floors) {
      for (let i in floors.data) {
        let item = floors.data[i]
        let appartmentObj = await getAllApartmentsOfFloor(item._id)
        result.push({ floor: item, appartment: appartmentObj.data })
      }
      generateResponse(true, "Building Data fetched", result, res)
    }
  }
}

export async function getAllLocations(req, res) {
  let buildings = await findAllBuilding()
  buildings = buildings.data
  let result = []
  if (buildings) {
    for (let i in buildings) {
      let item = buildings[i]
      let floorObj = await getAllFloorsOfBuilding(item._id)
      let f = await Promise.all(floorObj.data.map(async (item1) => {
        let apartment = await getAllApartmentsOfFloor(item1._id)
        if (apartment) {
          let finalObj = {
            floorId: item1._id,
            floorNo: item1.floorNo,
            apartment: apartment.data
          }
          return finalObj
        }
      }))
      result.push({ building: item.name, floor: f })
    }
    generateResponse(true, "Data fetched", result, res)
  }
  else {
    generateResponse(false, "No Data Found", null, res)
  }
}

export async function fetchRecord(req, res) {
  var query = require('url').parse(req.url, true).query
  let startDate = query.startDate
  let endDate = query.endDate
  let gatewayCode = query.gatewayCode
  let apiKey = query.apiKey
  let result = []
  console.log(query)
  if (startDate && endDate) {
    startDate = new Date(startDate).getTime()
    endDate = new Date(endDate).getTime()
    if (apiKey) {
      // console.log(apiKey)
      let key = await ApiKey.findOne({ key: apiKey }).exec()
      if (key.key) {
        if (gatewayCode) {
          let gatewayObj = await Gateway.findOne({ sid: gatewayCode }).populate('buildingId').populate('floorId').populate('apartmentId')
          if (gatewayObj) {
            // console.log(gatewayObj)
            let tracking = await Tracking.find({ $and: [{ gateway: gatewayCode }, { 'createdAt': { '$gte': startDate } }, { 'createdAt': { '$lte': endDate } }] })
            // console.log(tracking)
            tracking.forEach(item => {
              let date = new Date(item.createdAt)
              result.push({
                cardNo: item.card,
                employee: item.employeeName,
                group: item.groupName,
                signalStrength: item.signalStrength,
                time: item.timeIn
              })
            })
            console.log(result)
            let finalObj = {
              gateway: gatewayObj,
              trackingData: result
            }
            generateResponse(true, "Data fetched", finalObj, res)
          }
          else {
            generateResponse(false, "Please provide valid gateway code", null, res)
          }
        }
        else {
          generateResponse(false, "Please provide gateway code", null, res)
        }
      }
      else {
        generateResponse(false, "Please provide valid APIKey", null, res)
      }
    }
    else {
      generateResponse(false, "Please provide APIKey", null, res)
    }
  }
  else {
    generateResponse(false, "Invalid date", null, res)
  }
}