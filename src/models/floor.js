import { deleteGatewayFromFloor } from "./gateway";
import { deleteAllFloorApartments } from "./appartment";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Floor = mongoose.model(
  "floors",
  new Schema({
    floorNo: String,
    buildingId: { type: Schema.Types.ObjectId, ref: "buildings" },
    createdAt: String,
    updatedAt: String,
    isActive: { type: Boolean, default: true }
  })
);

export function saveFloor(obj) {
  return new Promise((resolve, reject) => {
    Floor.find({ floorNo: obj.floorNo, buildingId: obj.buildingId, isActive: true }).exec((err, docs) => {
      if (docs) {
        if (docs.length == 0) {
          obj.createdAt = Date.now()
          obj.updatedAt = Date.now()
          var floor = new Floor(obj)
          floor.save(function (err, data) {

            if (!err) {
              resolve({
                success: true,
                message: "Floor added Successfully",
                data
              });
            }
            else {
              resolve({
                success: false,
                message: "Unable to add Floor",
                data: err
              });
            }
          })
        }
        else {

          resolve({
            success: false,
            message: "Floor already exist",
            data: null
          });
        }
      }
    })
  })

}

export function findAllFloor() {
  return new Promise((resolve, reject) => {
    Floor.find({ isActive: true }).populate('buildingId').exec((err, docs) => {
      if (!err) {

        resolve({
          success: true,
          message: "Floor fetched successfully",
          data: docs
        });
      } else {

        resolve({
          success: false,
          message: "Can't find Floor",
          data: null
        });
      }
    });
  });
}

export function findFloorById(id) {
  return new Promise((resolve, reject) => {
    Floor.findById(id).populate('buildingId').exec((err, docs) => {
      if (!err) {

        resolve({
          success: true,
          message: "Floor fetched successfully",
          data: docs
        });
      } else {

        resolve({
          success: false,
          message: "Can't find Floor",
          data: null
        });
      }
    });
  });
}

export function editFloor(body) {
  return new Promise((resolve, reject) => {
    let id = body.id;
    delete body.id
    Floor.find({ floorNo: body.floorNo, buildingId: body.buildingId, isActive: true }).exec((err, docs) => {

      if (docs) {
        if (docs.length == 0) {
          body.updatedAt = Date.now()
          Floor.updateOne(
            { _id: id },
            { $set: body },
            (err, dep) => {
              if (!err) {

                resolve({
                  success: true,
                  message: "Floor updated successfully",
                  data: null
                });
              } else {

                resolve({
                  success: false,
                  message: "Unable to update Floor",
                  data: err
                });
              }
            });
        } else {

          resolve({
            success: false,
            message: "Floor already exist",
            data: err
          });
        }
      }
    })
  });
}

export function findAllFloorsOfBuilding(id) {
  return new Promise((resolve, reject) => {
    Floor.find({ buildingId: id, isActive: true }).populate('buildingId').exec((err, docs) => {
      if (!err) {

        resolve({
          success: true,
          message: "Floor fetched successfully",
          data: docs
        });
      } else {

        resolve({
          success: false,
          message: "Can't find Floor",
          data: null
        });
      }
    });
  });
}

export function removeFloor(id) {
  return new Promise((resolve, reject) => {
    let status = { isActive: false }
    Floor.updateOne(
      { _id: id },
      { $set: status },
      (err, dep) => {
        if (!err) {

          resolve({
            success: true,
            message: "Floor removed successfully",
            data: null
          });
        } else {

          resolve({
            success: false,
            message: "Unable to remove Floor",
            data: err
          });
        }
      });
  });
}

export function getAllFloorsOfBuilding(id) {
  return new Promise((resolve, reject) => {
    Floor.find({ buildingId: id, isActive: true }).exec((err, docs) => {
      if (!err) {

        resolve({
          success: true,
          message: "Floor fetched successfully",
          data: docs
        });
      } else {

        resolve({
          success: false,
          message: "Can't find Floor",
          data: null
        });
      }
    });
  });
}

export async function saveAllFloors(obj) {
  let buildingId = obj.buildingId
  let count = obj.count
  let flCount = await Floor.countDocuments({ buildingId: buildingId }).exec()
  if (flCount == 0) {
    for (var i = 1; i <= count; i++) {
      let obj = {
        floorNo: `Floor-${i}`,
        buildingId: buildingId,
        createdAt: Date.now(),
        updatedAt: Date.now()
      }
      var floor = new Floor(obj)
      floor.save(function (err, docs) {
        if (!err) {
          console.log("Floor Saved", docs)
        }
      })
    }
    return true;
  }
  else {
    flCount += 1
    count += flCount
    for (var i = flCount; i <= count; i++) {
      let obj = {
        floorNo: `Floor-${i}`,
        buildingId: buildingId,
        createdAt: Date.now(),
        updatedAt: Date.now()
      }
      var floor = new Floor(obj)
      floor.save(function (err, docs) {
        if (!err) {
          console.log("Floor Saved", docs)
        }
      })
    }
    return true;
  }
}

export async function deleteFloors(id) {
  let gateway = await deleteGatewayFromFloor(id)
  if (gateway == true) {
    let apartment = await deleteAllFloorApartments(id)
    if (apartment == true) {
      let floor = await Floor.deleteOne({ _id: id }).exec()
      if (floor) {
        return ({ success: true, message: "Gateway unassigned and Floor deleted successfully", data: floor })
      }
      else {
        return ({ success: false, message: "Unable to delete floor", data: null })
      }
    }
    else {
      return ({ success: false, message: "Unable to delete floor", data: null })
    }
  }
  else {
    let apartment = await deleteAllFloorApartments(id)
    if (apartment == true) {
      let floor = await Floor.deleteOne({ _id: id }).exec()
      if (floor) {
        return ({ success: true, message: "Floor deleted successfully", data: floor })
      }
      else {
        return ({ success: false, message: "Unable to delete floor", data: null })
      }
    }
    else {
      return ({ success: false, message: "Unable to delete floor", data: null })
    }
  }
}

export async function deleteAllFloorsOfBuilding(id) {
  let floor = await Floor.deleteMany({ buildingId: id }).exec()
  if (floor) {
    return true
  }
  else {
    return false
  }
}