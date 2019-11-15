"use strict";


import { generateResponse, parseBody } from "../../utilities";
import { saveTracking, findAllTracking, findTrackingById, editTracking, findEmployeeTrackRecord, Tracking } from "../../models/tracking";
import { updateBattery, Gateway } from "../../models/gateway";
import { getEmployeeDataByBle, Employee } from "../../models/employee";
import { findBLEByCode } from "../../models/ble";
var _ = require('lodash')

export async function addTracking(req, res) {
    try {
        let body = parseBody(req)
        let apikey = body.apikey
        let gatewayCode = body.g_c
        let cards = body.cards
        let batteryStatus = body.battery
        let gatewayObj = await Gateway.findOne({ apikey: apikey, sid: gatewayCode }).populate('buildingId').populate('floorId').populate('apartmentId')
        if (gatewayObj) {
            if (batteryStatus) {
                let battery = await updateBattery(gatewayObj._id, batteryStatus)
                console.log("battery updated", battery)
            }
            cards.forEach(item => {
                findBLEByCode(item.card).then(c => {
                    getEmployeeDataByBle(c._id).then(resp => {
                        if (resp) {
                            let obj = {
                                gateway: gatewayCode,
                                card: resp.bleId.sid,
                                timeIn: body.Time,
                                signalStrength: item.rssi,
                                employeeName: resp.name,
                                groupName: resp.groupId.name,
                                groupColor: resp.groupId.colour,
                                building: gatewayObj.buildingId.name,
                                floor: gatewayObj.floorId.floorNo,
                                apartment: gatewayObj.apartmentId.apartmentNo,
                                buildingId: gatewayObj.buildingId._id,
                                floorId: gatewayObj.floorId._id,
                                apartmentId: gatewayObj.apartmentId._id,
                                bleId: resp.bleId._id,
                                employeeId: resp._id,
                                gatewayId: gatewayObj._id,
                                createdAt: Date.now(),
                                updatedAt: Date.now()
                            }
                            saveTracking(obj).then(da => {
                                if (da) {
                                    console.log(da)
                                } else {
                                    console.log('error occured')
                                }
                            })
                        }
                    })
                })
            })
            generateResponse(true, "Tracking added", null, res)
        } else {
            generateResponse(false, "Authentication failed, Please provide apiKey of gateway", null, res)
        }
    } catch (err) {
        generateResponse(false, 'Error occured, 404 not found!', err, res)
    }
}

export async function getAllTrackings(req, res) {
    try {
        let trackings = await findAllTracking()
        if (trackings) {
            generateResponse(true, "All Trackings fetched", trackings, res)
        } else {
            generateResponse(false, "No Trackings found", null, res)
        }
    } catch (err) {
        generateResponse(false, 'Error occured, 404 not found!', err, res)
    }
}

export async function getTrackingById(req, res) {
    try {
        let id = req.params.id
        let tracking = await findTrackingById(id)
        if (tracking) {
            generateResponse(true, "Tracking fetched", tracking, res)
        } else {
            generateResponse(false, "Can't find Tracking", null, res)
        }
    } catch (err) {
        generateResponse(false, 'Error occured, 404 not found!', err, res)
    }
}

export async function updateTracking(req, res) {
    try {
        let body = parseBody(req)
        if (body) {
            let tracking = await editTracking(body)
            if (tracking) {
                generateResponse(true, "Tracking updated", null, res)
            } else {
                generateResponse(false, "Can't update Tracking", null, res)
            }
        } else {
            generateResponse(false, "Please give complete info", null, res)
        }
    } catch (err) {
        generateResponse(false, 'Error occured, 404 not found!', err, res)
    }
}

export async function getEmployeeTrackingRecord(req, res) {
    try {
        let body = parseBody(req)
        if (body) {
            let tracking = await findEmployeeTrackRecord(body.key, body.value)
            if (tracking) {
                generateResponse(true, "Tracking record fetched", tracking, res)
            } else {
                generateResponse(false, "Can not fetch tracking record", null, res)
            }
        } else {
            generateResponse(false, "Please give complete info", null, res)
        }
    } catch (err) {
        generateResponse(false, 'Error occured, 404 not found!', err, res)
    }
}

export async function sendData(req, res) {
    let employee = await Employee.find({}).exec()
    let from = new Date().getTime()
    let to = new Date().getTime() - 700 * 60
        // let data = []
    if (employee) {
        let tracking = await Tracking.find({ $and: [{ 'createdAt': { '$gte': to } }, { 'createdAt': { '$lte': from } }] })
        let finalObj = _.uniqBy(tracking, (x) => {
                return x.card
            })
            // for (let i in employee) {
            //   let item = employee[i]
            //   let tracking = await Tracking.findOne({ employeeId: item._id }).sort({ createdAt: -1 })
            //   console.log(tracking,"tracking")
            //   data.push(tracking)
            // }
        generateResponse(true, "live data fetched", finalObj, res)
    }
}

export async function filterData(req, res) {
    let body = parseBody(req)
    let filter = body.filter
    let dt = body.dt
    if (filter) {
        if (dt == true) {
            let dateTime = body.dateTime
            let toDateTime = dateTime.toDateTime
            let fromDateTime = dateTime.fromDateTime
            let tracking = await Tracking.find({ $and: [filter, { 'createdAt': { '$gte': fromDateTime } }, { 'createdAt': { '$lte': toDateTime } }] })
            if (tracking) {
                generateResponse(true, "Data fetched", tracking, res)
            } else {
                generateResponse(false, "No Data found", null, res)
            }
        } else if (dt == false) {
            let tracking = await Tracking.find(filter)
            if (tracking) {
                generateResponse(true, "Data fetched", tracking, res)
            } else {
                generateResponse(false, "No Data found", null, res)
            }
        }
    } else {
        let dateTime = body.dateTime
        let toDateTime = dateTime.toDateTime
        toDateTime = new Date(toDateTime).getTime()
        let fromDateTime = dateTime.fromDateTime
        fromDateTime = new Date(fromDateTime).getTime()
        let tracking = await Tracking.find({ $and: [{ 'createdAt': { '$gte': fromDateTime } }, { 'createdAt': { '$lte': toDateTime } }] })
        if (tracking) {
            generateResponse(true, "Data fetched", tracking, res)
        } else {
            generateResponse(false, "No Data found", null, res)
        }
    }
}