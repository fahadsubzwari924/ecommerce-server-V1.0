var mongoose = require("mongoose");
var Schema = mongoose.Schema;

export var Employee = mongoose.model(
  "employees",
  new Schema({
    name: String,
    email: String,
    registrationDate: String,
    createdAt: String,
    updatedAt: String,
    phoneno : String,
    groupId: { type: Schema.Types.ObjectId, ref: "groups" },
    bleId: { type: Schema.Types.ObjectId, ref: "bles" },
    isActive: { type: Boolean, default: true }
  })
);

export function saveEmployee(obj) {
  return new Promise((resolve, reject) => {
    Employee.find({ email: obj.email, isActive: true }).exec((err, docs) => {
      console.log(docs)
      if (docs) {
        if (docs.length == 0) {
          Employee.find({ bleId: obj.bleId, isActive: true }).exec((err, docs) => {
            if (docs) {
              if (docs.length == 0) {
                obj.createdAt = Date.now()
                obj.updatedAt = Date.now()
                var employee = new Employee(obj)
                employee.save(function (err, data) {
                  if (!err) {
                    resolve({
                      success: true,
                      message: "Employee added Successfully",
                      data
                    });
                  }
                  else {
                    resolve({
                      success: false,
                      message: "Unable to add Employee",
                      data: err
                    });
                  }
                })
              } else {
                
                resolve({
                  success: false,
                  message: "Can't add, BLE already assigned to employee",
                  data: null
                });
              }
            }
          })
        }
        else {
          
          resolve({
            success: false,
            message: "Employee already exist",
            data: null
          });
        }
      }
    })
  })
}

export function findAllEmployee() {
  return new Promise((resolve, reject) => {
    Employee.find({ isActive: true }).populate('groupId').populate('bleId').exec((err, docs) => {
      if (!err) {
        
        resolve({
          success: true,
          message: "Employee fetched successfully",
          data: docs
        });
      } else {
        
        resolve({
          success: false,
          message: "Can't find Employee",
          data: null
        });
      }
    });
  });
}

export function findEmployeeById(id) {
  return new Promise((resolve, reject) => {
    Employee.findById(id).populate('groupId').populate('bleId').exec((err, docs) => {
      if (!err) {
        
        resolve({
          success: true,
          message: "Employee fetched successfully",
          data: docs
        });
      } else {
        
        resolve({
          success: false,
          message: "Can't find Employee",
          data: null
        });
      }
    });
  });
}

export function editEmployee(body) {
  return new Promise((resolve, reject) => {
    let id = body.id;
    delete body.id
    Employee.find({ email: body.email, isActive: true }).exec((err, docs) => {
      if (docs) {
        if (docs.length == 0) {
          Employee.find({ bleId: body.bleId, isActive: true }).exec((err, docs) => {
            if (docs) {
              if (docs.length == 0) {
                body.updatedAt = Date.now()
                Employee.updateOne(
                  { _id: id },
                  { $set: body },
                  (err, dep) => {
                    if (!err) {
                      
                      resolve({
                        success: true,
                        message: "Employee updated successfully",
                        data: null
                      });
                    } else {
                      
                      resolve({
                        success: false,
                        message: "Unable to update Employee",
                        data: err
                      });
                    }
                  });
              } else {
                
                resolve({
                  success: false,
                  message: "BLE already assigned to employee",
                  data: err
                });
              }
            }
          })
        } else {
          
          resolve({
            success: false,
            message: "Employee already exist",
            data: err
          });
        }
      }
    })
  });
}

export function findEmployeeByBle(bleId) {
  return new Promise((resolve, reject) => {
    Employee.findOne({ bleId: bleId }).populate('groupId').populate('bleId').exec((err, docs) => {
      if (!err) {
        let result = {
          card: docs.bleId.sid,
          employeeName: docs.name,
          groupColor: docs.groupId.colour
        }
        resolve({
          success: true,
          message: "Employee fetched successfully",
          data: result
        });
      } else {
        
        resolve({
          success: false,
          message: "Can't find Employee",
          data: null
        });
      }
    });
  });
}

export function removeEmployee(id) {
  return new Promise((resolve, reject) => {
    let status = { isActive: false }
    Employee.updateOne(
      { _id: id },
      { $set: status },
      (err, dep) => {
        if (!err) {
          
          resolve({
            success: true,
            message: "Employee removed successfully",
            data: null
          });
        } else {
          
          resolve({
            success: false,
            message: "Unable to remove Employee",
            data: err
          });
        }
      });
  });
}

export function getEmployeeDataByBle(bleId) {
  return new Promise((resolve, reject) => {
    Employee.findOne({ bleId: bleId }).populate('groupId').populate('bleId').exec((err, docs) => {
      if (!err) {
        resolve (docs)
      } else {
        resolve (null)
      }
    });
  });
}