import { deleteAllBuildingApartments } from "./appartment";
import { deleteAllFloorsOfBuilding } from "./floor";
import { deleteGatewayFromBuildingId } from "./gateway";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Building = mongoose.model(
  "buildings",
  new Schema({
    name: String,
    createdAt: String,
    updatedAt: String,
    isActive: { type: Boolean, default: true }
  })
);

export function saveBuilding(obj) {
  return new Promise((resolve, reject) => {
    Building.find({ name: obj.name }).exec((err, docs) => {
      if (docs) {
        if (docs.length == 0) {
          obj.createdAt = Date.now()
          obj.updatedAt = Date.now()
          var building = new Building(obj)
          building.save(function (err, data) {

            if (!err) {
              resolve({
                success: true,
                message: "Building added Successfully",
                data
              });
            }
            else {
              resolve({
                success: false,
                message: "Unable to add Building",
                data: err
              });
            }
          })
        }
        else {

          resolve({
            success: false,
            message: "Building already exist",
            data: null
          });
        }
      }
    })
  })
}

export function findAllBuilding() {
  return new Promise((resolve, reject) => {
    Building.find({}).exec((err, docs) => {
      if (!err) {

        resolve({
          success: true,
          message: "Building fetched successfully",
          data: docs
        });
      } else {

        resolve({
          success: false,
          message: "Can't find Building",
          data: null
        });
      }
    });
  });
}

export function findBuildingById(id) {
  return new Promise((resolve, reject) => {
    Building.findById(id).exec((err, docs) => {
      if (!err) {
        resolve({
          success: true,
          message: "Building fetched successfully",
          data: docs
        });
      } else {

        resolve({
          success: false,
          message: "Can't find Building",
          data: null
        });
      }
    });
  });
}

export function editBuilding(body) {
  return new Promise((resolve, reject) => {
    let id = body.id;
    delete body.id
    Building.find({ name: body.name, isActive: true }).exec((err, docs) => {
      if (docs) {
        if (docs.length == 0) {
          body.updatedAt = Date.now()
          Building.updateOne(
            { _id: id },
            { $set: body },
            (err, dep) => {
              if (!err) {

                resolve({
                  success: true,
                  message: "Building updated successfully",
                  data: null
                });
              } else {

                resolve({
                  success: false,
                  message: "Unable to update Building",
                  data: err
                });
              }
            });
        } else {

          resolve({
            success: false,
            message: "Building already exist",
            data: err
          });
        }
      }
    })
  });
}

export function findAllBuildingByName(name) {
  return new Promise((resolve, reject) => {
    Building.findOne({ name: name, isActive: true }).exec((err, docs) => {
      if (!err) {

        resolve({
          success: true,
          message: "Building by name fetched successfully",
          data: docs
        });
      } else {

        resolve({
          success: false,
          message: "Can't find Building",
          data: null
        });
      }
    });

  });
}

export function removeBuilding(id) {
  return new Promise((resolve, reject) => {
    let status = { isActive: false }
    Building.updateOne(
      { _id: id },
      { $set: status },
      (err, dep) => {
        if (!err) {

          resolve({
            success: true,
            message: "Building removed successfully",
            data: null
          });
        } else {

          resolve({
            success: false,
            message: "Unable to remove Building",
            data: err
          });
        }
      });
  });
}

export async function deleteBuildings(id) {
  let gateway = await deleteGatewayFromBuildingId(id)
  let apartment = await deleteAllBuildingApartments(id)
  if (apartment == true) {
    let floor = await deleteAllFloorsOfBuilding(id)
    if (floor == true) {
      let building = await Building.deleteOne({ _id: id }).exec()
      if (building) {
        return ({ success: true, message: "Building deleted successfully", data: building })
      }
      else {
        return ({ success: false, message: "Unable to delete building", data: null })
      }
    }
    else {
      return ({ success: false, message: "Unable to delete building, can't remove floor", data: null })
    }
  }
  else {
    return ({ success: false, message: "Unable to delete building, can't remove apartment", data: null })
  }
}