import { generateApiKey } from "../utilities";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

export var Gateway = mongoose.model(
  "gateways",
  new Schema({
    macAddress : String,
    apiKey : String,
    sid: String,
    batteryStatus: String,
    createdAt: String,
    updatedAt: String,
    buildingId: { type: Schema.Types.ObjectId, ref: 'buildings' },
    floorId: { type: Schema.Types.ObjectId, ref: "floors" },
    apartmentId: { type: Schema.Types.ObjectId, ref: "apartments" },
    isActive: { type: Boolean, default: true }
  })
);

export function saveGateway(obj) {
  return new Promise((resolve, reject) => {
    Gateway.find({ sid: obj.sid, isActive: true }).exec((err, docs) => {
      if (docs) {
        if (docs.length == 0) {
          obj.createdAt = Date.now()
          obj.updatedAt = Date.now()
          var gateway = new Gateway(obj)
          gateway.save(function (err, data) {

            if (!err) {
              resolve({
                success: true,
                message: "Gateway added Successfully",
                data
              });
            }
            else {
              resolve({
                success: false,
                message: "Unable to add Gateway",
                data: err
              });
            }
          })
        }
        else {

          resolve({
            success: false,
            message: "Gateway already exist",
            data: null
          });
        }
      }
    })
  })
}

export function findAllGateway() {
  return new Promise((resolve, reject) => {
    Gateway.find({ isActive: true }).populate('apartmentId').populate('floorId').populate('buildingId').exec((err, docs) => {
      if (!err) {
        resolve({
          success: true,
          message: "Gateway fetched successfully",
          data: docs
        });
      } else {

        resolve({
          success: false,
          message: "Can't find Gateway",
          data: null
        });
      }
    });
  });
}

export function findGatewayById(id) {
  return new Promise((resolve, reject) => {
    Gateway.findById(id).populate('apartmentId').populate('floorId').populate('buildingId').exec((err, docs) => {
      if (!err) {

        resolve({
          success: true,
          message: "Gateway fetched successfully",
          data: docs
        });
      } else {

        resolve({
          success: false,
          message: "Can't find Gateway",
          data: null
        });
      }
    });
  });
}

export function editGateway(body) {
  return new Promise((resolve, reject) => {
    let id = body.id;
    delete body.id
    Gateway.find({ sid: body.sid, isActive: true }).exec((err, docs) => {
      if (docs) {
        if (docs.length == 0) {
          body.updatedAt = Date.now()
          Gateway.updateOne(
            { _id: id },
            { $set: body },
            (err, dep) => {
              if (!err) {

                resolve({
                  success: true,
                  message: "Gateway updated successfully",
                  data: null
                });
              } else {

                resolve({
                  success: false,
                  message: "Unable to update Gateway",
                  data: err
                });
              }
            });
        } else {

          resolve({
            success: false,
            message: "Gateway already exist",
            data: err
          });
        }
      }
    })
  })
}

export function findGatewayByCode(gc) {
  return new Promise((resolve, reject) => {
    Gateway.findOne({ sid: gc, isActive: true }).populate('apartmentId').populate('floorId').populate('buildingId').exec((err, docs) => {
      if (!err) {

        let result = {
          gc: docs.sid,
          building: docs.buildingId.name,
          floor: docs.floorId.floorNo,
          apartment: docs.apartmentId.apartmentNo
        }
        resolve({
          success: true,
          message: "Gateway fetched successfully",
          data: result
        });
      } else {

        resolve({
          success: false,
          message: "Can't find Gateway",
          data: null
        });
      }
    })
  });
}

export function removeGateway(id) {
  return new Promise((resolve, reject) => {
    let status = { isActive: false }
    Gateway.updateOne(
      { _id: id },
      { $set: status },
      (err, dep) => {
        if (!err) {

          resolve({
            success: true,
            message: "Gateway removed successfully",
            data: null
          });
        } else {

          resolve({
            success: false,
            message: "Unable to remove Gateway",
            data: err
          });
        }
      });
  });
}

export async function deleteGatewayFromApartmentId(id) {
  let gateway = await Gateway.findOne({ apartmentId: id }).exec()
  if (gateway) {
    Gateway.updateOne(
      { apartmentId: id },
      { $set: { apartmentId: null } },
      (err, docs) => {
        if (!err) {
          return true
        }
        else {
          return false
        }
      })
  }
  else {
    return false
  }
}

export async function deleteGatewayFromFloor(id) {
  let gateway = await Gateway.findOne({ floorId: id }).exec()
  if (gateway) {
    Gateway.updateOne(
      { floorId: id },
      { $set: { floorId: null, apartmentId: null } },
      (err, docs) => {
        if (!err) {
          return true
        }
        else {
          return false
        }
      })
  }
  else {
    return false
  }
}

export async function deleteGatewayFromBuildingId(id) {
  let gateway = await Gateway.findOne({ buildingId: id }).exec()
  if (gateway) {
    Gateway.updateOne(
      { floorId: id },
      { $set: { floorId: null, apartmentId: null, buildingId: null } },
      (err, docs) => {
        if (!err) {
          return true
        }
        else {
          return false
        }
      })
  }
  else {
    return false
  }
}

export async function checkGatewayForApartment(id) {
  let gateway = await Gateway.find({ apartmentId: id })
  if (gateway) {
    if (gateway.length > 0) {
      return ({ success: true, message: "Gateway data exist", data: true })
    }
    else {
      return ({ success: false, message: "Gateway data not found", data: false })
    }
  }
  else {
    return ({ success: false, message: "Gateway data not found", data: false })
  }
}

export async function checkGatewayForFloor(id) {
  let gateway = await Gateway.find({ floorId: id })
  if (gateway) {
    if (gateway.length > 0) {
      return ({ success: true, message: "Gateway data exist", data: true })
    }
    else {
      return ({ success: false, message: "Gateway data not found", data: false })
    }
  }
  else {
    return ({ success: false, message: "Gateway data not found", data: false })
  }
}

export async function checkGatewayForBuilding(id) {
  let gateway = await Gateway.find({ buildingId: id })
  if (gateway) {
    if (gateway.length > 0) {
      return ({ success: true, message: "Gateway data exist", data: true })
    }
    else {
      return ({ success: false, message: "Gateway data not found", data: false })
    }
  }
  else {
    return ({ success: false, message: "Gateway data not found", data: false })
  }
}

export async function getGatewayByCode(code) {
  let gateway = await Gateway.findOne({ sid: code }).populate('buildingId').populate('floorId').populate('apartmentId')
  return gateway
}

export async function updateBattery(id,status ){
  let gateway = await Gateway.updateOne({ _id: id },{ $set: {batteryStatus : status} })
  if(gateway){
    console.log('battery updated')
    return true
  }
  else{
      console.log('cant update battery')
      return false
  }
}

export async function getGatewayObject(macAddress){
  let gatewayObj = await Gateway.findOne({macAddress : macAddress})
  if(gatewayObj){
    return gatewayObj
  }
  else{
    return null
  }
}