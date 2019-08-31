import { deleteGatewayFromApartmentId } from "./gateway";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Apartment = mongoose.model(
  "apartments",
  new Schema({
    apartmentNo: String,
    floorId: { type: Schema.Types.ObjectId, ref: "floors" },
    buildingId: { type: Schema.Types.ObjectId, ref: "buildings" },
    createdAt: String,
    updatedAt: String,
    isActive: { type: Boolean, default: true }
  })
);

export function saveApartment(obj) {
  return new Promise((resolve, reject) => {
    Apartment.find({ apartmentNo: obj.apartmentNo, floorId: obj.floorId, buildingId: obj.buildingId, isActive: true }).exec((err, docs) => {
      if (docs) {
        if (docs.length == 0) {
          obj.createdAt = Date.now()
          obj.updatedAt = Date.now()
          var apartment = new Apartment(obj)
          apartment.save(function (err, data) {

            if (!err) {
              resolve({
                success: true,
                message: "Apartment added Successfully",
                data
              });
            }
            else {
              resolve({
                success: false,
                message: "Unable to add Apartment",
                data: err
              });
            }
          })
        }
        else {

          resolve({
            success: false,
            message: "Apartment already exist",
            data
          });
        }
      }
    })
  })
}

export function findAllApartment() {
  return new Promise((resolve, reject) => {
    Apartment.find({ isActive: true }).populate('buildingId').populate('floorId').exec((err, docs) => {
      if (!err) {
        resolve({
          success: true,
          message: "Apartment fetched successfully",
          data: docs
        });
      } else {
        resolve({
          success: false,
          message: "Can't find Apartment",
          data: null
        });
      }
    });
  });
}

export function findApartmentById(id) {
  return new Promise((resolve, reject) => {
    Apartment.findById(id).populate('buildingId').populate('floorId').exec((err, docs) => {
      if (!err) {

        resolve({
          success: true,
          message: "Apartment fetched successfully",
          data: docs
        });
      } else {

        resolve({
          success: false,
          message: "Can't find Apartment",
          data: null
        });
      }
    });
  });
}

export function editApartment(body) {
  return new Promise((resolve, reject) => {
    let id = body.id;
    delete body.id
    body.updatedAt = Date.now()
    Apartment.find({ apartmentNo: body.apartmentNo, floorId: body.floorId, buildingId: body.buildingId, isActive: true }).exec((err, docs) => {
      if (docs) {
        if (docs.length == 0) {
          Apartment.updateOne(
            { _id: id },
            { $set: body },
            (err, dep) => {
              if (!err) {

                resolve({
                  success: true,
                  message: "Apartment Updated",
                  data: null
                });
              } else {

                resolve({
                  success: false,
                  message: "Unable to update apartment",
                  data: err
                });
              }
            });
        } else {

          resolve({
            success: false,
            message: "Apartment already exist",
            data: err
          });
        }
      }
    })
  });
}

export function findAllApartmentsOfFloor(id) {
  return new Promise((resolve, reject) => {
    Apartment.find({ floorId: id, isActive: true }).populate('buildingId').populate('floorId').exec((err, docs) => {
      if (!err) {

        resolve({
          success: true,
          message: "Apartment Of Floor fetched successfully",
          data: docs
        });
      } else {

        resolve({
          success: false,
          message: "Can't find Apartment",
          data: null
        });
      }
    });
  });
}

export function findAllApartmentsOfBuilding(id) {
  return new Promise((resolve, reject) => {
    Apartment.find({ buildingId: id, isActive: true }).populate('buildingId').populate('floorId').exec((err, docs) => {
      if (!err) {
        resolve({
          success: true,
          message: "Apartment Of Floor fetched successfully",
          data: docs
        });
      } else {

        resolve({
          success: false,
          message: "Can't find Apartment",
          data: null
        });
      }
    });
  });
}

export async function removeApartment(id) {
  let status = { isActive: false }
  let apartment = await Apartment.updateOne(
    { _id: id },
    { $set: status })
  return apartment
}

export function getAllApartmentsOfFloor(id) {
  return new Promise((resolve, reject) => {
    Apartment.find({ floorId: id, isActive: true }).exec((err, docs) => {
      if (!err) {

        resolve({
          success: true,
          message: "Apartment Of Floor fetched successfully",
          data: docs
        });
      } else {

        resolve({
          success: false,
          message: "Can't find Apartment",
          data: null
        });
      }
    });
  });
}

export async function saveAllApartments(obj) {
  let buildingId = obj.buildingId
  let floorId = obj.floorId
  let count = obj.count
  let aptCount = await Apartment.count({ buildingId: buildingId, floorId: floorId }).exec()
  if (aptCount == 0) {
    for (var i = 1; i <= count; i++) {
      let obj = {
        apartmentNo: `Apt-${i}`,
        floorId: floorId,
        buildingId: buildingId,
        createdAt: Date.now(),
        updatedAt: Date.now()
      }
      var apt = new Apartment(obj)
      apt.save(function (err, docs) {
        if (!err) {
          console.log("Apartment Saved", docs)
        }
      })
    }
    return true;
  }
  else {
    aptCount += 1
    count += aptCount
    for (var i = aptCount; i <= count; i++) {
      let obj = {
        apartmentNo: `Apt-${i}`,
        floorId: floorId,
        buildingId: buildingId,
        createdAt: Date.now(),
        updatedAt: Date.now()
      }
      var apt = new Apartment(obj)
      apt.save(function (err, docs) {
        if (!err) {
          console.log("Apartment Saved", docs)
        }
      })
    }
    return true;
  }
}

export async function deleteApartments(id) {
  let gateway = await deleteGatewayFromApartmentId(id)
  if (gateway == true) {
    let apartment = await Apartment.deleteOne({ _id: id }).exec()
    if (apartment) {
      return ({ success: true, message: "Gateway unassigned and Apartment deleted successfully", data: apartment })
    }
    else {
      return ({ success: false, message: "Unable to delete apartment", data: null })
    }
  }
  else {
    let apartment = await Apartment.deleteOne({ _id: id }).exec()
    if (apartment) {
      return ({ success: true, message: "Apartment deleted successfully", data: apartment })
    }
    else {
      return ({ success: false, message: "Unable to delete apartment", data: null })
    }
  }
}

export async function deleteAllBuildingApartments(id) {
  let apartments = await Apartment.deleteMany({ buildingId: id }).exec()
  if (apartments) {
    return true
  } else {
    return false
  }
}

export async function deleteAllFloorApartments(id) {
  let apartments = await Apartment.deleteMany({ floorId: id }).exec()
  if (apartments) {
    return true
  } else {
    return false
  }
}