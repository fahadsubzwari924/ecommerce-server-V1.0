var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var BLE = mongoose.model(
  "bles",
  new Schema({
    sid : String,
    createdAt: String,
    updatedAt: String,
    isActive : {type : Boolean, default: true}   
  })
);

export function saveBLE(obj) {
  return new Promise((resolve, reject) => {
    BLE.find({ sid: obj.sid , isActive: true }).exec((err, docs) => {
      if (docs) {
        if (docs.length == 0) {
          obj.createdAt = Date.now()
          obj.updatedAt = Date.now()
          var ble = new BLE(obj)
          ble.save(function (err, data) {
            
            if (!err) {
              resolve({
                success: true,
                message: "BLE added Successfully",
                data
              });
            }
            else {
              resolve({
                success: false,
                message: "Unable to add BLE",
                data: err
              });
            }
          })
        }
        else {
          resolve({
            success: false,
            message: "BLE already exist",
            data: null
          });
        }
      }
    })
  })
}

export function findAllBLE() {
  return new Promise((resolve, reject) => {
    BLE.find({ isActive: true }).exec((err, docs) => {
      if (!err) {
        
        resolve({
          success: true,
          message: "BLE fetched successfully",
          data: docs
        });
      } else {
        
        resolve({
          success: false,
          message: "Can't find BLE",
          data: null
        });
      }
    })   
  });
}

export function findBLEById(id) {
  return new Promise((resolve, reject) => {
    BLE.findById(id).exec((err, docs) => {
      if (!err) {
        
        resolve({
          success: true,
          message: "BLE fetched successfully",
          data: docs
        });
      } else {
        
        resolve({
          success: false,
          message: "Can't find BLE",
          data: null
        });
      }
    });
  });
}

export function editBLE(body) {
  return new Promise((resolve, reject) => {
    let id = body.id;
    delete body.id
    BLE.find({ sid : body.sid, isActive: true }).exec((err, docs) => {
      if (docs) {
        if (docs.length == 0) {
          body.updatedAt = Date.now()
          BLE.updateOne(
            { _id: id },
            { $set: body },
            (err, dep) => {
              if (!err) {
                
                resolve({
                  success: true,
                  message: "BLE updated successfully",
                  data: null
                });
              } else {
                
                resolve({
                  success: false,
                  message: "Unable to update BLE",
                  data: err
                });
              }
            });
        } else {
          
          resolve({
            success: false,
            message: "BLE already exist",
            data: err
          });
        }
      }
    })
  });
}

export function removeBLE(id) {
  return new Promise((resolve, reject) => {
    let status = { isActive: false }
    BLE.updateOne(
      { _id: id },
      { $set: status },
      (err, dep) => {
        if (!err) {
          
          resolve({
            success: true,
            message: "BLE removed successfully",
            data: null
          });
        } else {
          
          resolve({
            success: false,
            message: "Unable to remove BLE",
            data: err
          });
        }
      });
  });
}

export async function findBLEByCode(code){
  let obj = await BLE.findOne({sid: code}).exec()
  if(obj){
    return obj
  }
}

