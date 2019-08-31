var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Group = mongoose.model(
  "groups",
  new Schema({
    name: String,
    colour: String,
    createdAt: String,
    updatedAt: String,
    isActive: { type: Boolean, default: true }
  })
);

export function saveGroup(obj) {
  return new Promise((resolve, reject) => {
    Group.find({ name: obj.name, isActive : true }).exec((err, docs) => {
      if (docs) {
        if (docs.length == 0) {
          Group.find({ colour: obj.colour }).exec((err, docs) => {
            if (docs) {
              if (docs.length == 0) {
                obj.createdAt = Date.now()
                obj.updatedAt = Date.now()
                var group = new Group(obj)
                group.save(function (err, data) {
                  
                  if (!err) {
                    resolve({
                      success: true,
                      message: "Group added Successfully",
                      data
                    });
                  }
                  else {
                    resolve({
                      success: false,
                      message: "Unable to add Group",
                      data: err
                    });
                  }
                })
              } else {
                
                resolve({
                  success: false,
                  message: "Group with this colour already exist",
                  data: null
                });
              }
            }
          })
        }
        else {
          
          resolve({
            success: false,
            message: "Group with this name already exist",
            data: null
          });
        }
      }
    })
  })
}

export function findAllGroup() {
  return new Promise((resolve, reject) => {
    Group.find({isActive : true}).exec((err, docs) => {
      if (!err) {
        
        resolve({
          success: true,
          message: "Group fetched successfully",
          data: docs
        });
      } else {
        
        resolve({
          success: false,
          message: "Can't find Group",
          data: null
        });
      }
    });
  });
}

export function findGroupById(id) {
  return new Promise((resolve, reject) => {
    Group.findById(id).exec((err, docs) => {
      if (!err) {
        
        resolve({
          success: true,
          message: "Group fetched successfully",
          data: docs
        });
      } else {
        
        resolve({
          success: false,
          message: "Can't find Group",
          data: null
        });
      }
    });
  });
}

export function editGroup(body) {
  return new Promise((resolve, reject) => {
    let id = body.id;
    delete body.id
  
    if(body.name && body.colour){
    Group.find({ name: body.name, isActive: true }).exec((err, docs) => {
      if (docs) {
        if (docs.length == 0) {
          Group.find({ colour: body.colour }).exec((err, docs) => {
            if (docs) {
              if (docs.length == 0) {
                body.updatedAt = Date.now()
                Group.updateOne(
                  { _id: id },
                  { $set: body },
                  (err, dep) => {
                    if (!err) {
                      
                      resolve({
                        success: true,
                        message: "Group updated successfully",
                        data: null
                      });
                    } else {
                      
                      resolve({
                        success: false,
                        message: "Unable to update Group",
                        data: err
                      });
                    }
                  });
              } else {
                resolve({
                  success: false,
                  message: "Can't update! Group with this color already exist",
                  data: err
                });
              }
            }
          })
        } else {
          resolve({
            success: false,
            message: "Can't update! Group with this name already exist",
            data: err
          });
        }
      }
    })
  }

  else if(body.name){
    Group.find({ name: body.name, isActive: true }).exec((err, docs) => {
    if(docs){
      if(docs.length == 0){
        body.updatedAt = Date.now()
        Group.updateOne(
          { _id: id },
          { $set: body },
          (err, dep) => {
            if (!err) {
              resolve({
                success: true,
                message: "Group updated successfully",
                data: null
              });
            } else {
              
              resolve({
                success: false,
                message: "Unable to update Group",
                data: err
              });
            }
          });
      }else {
          resolve({
            success: false,
            message: "Can't update! Group with this name already exist",
            data: err
          });
        }
    }
    })
  }

  else if(body.colour){
    Group.find({ name: body.colour, isActive: true }).exec((err, docs) => {
      if(docs){
        if(docs.length == 0){
          body.updatedAt = Date.now()
          Group.updateOne(
            { _id: id },
            { $set: body },
            (err, dep) => {
              if (!err) {
                resolve({
                  success: true,
                  message: "Group updated successfully",
                  data: null
                });
              } else {
                resolve({
                  success: false,
                  message: "Unable to update Group",
                  data: err
                });
              }
            });
        }else {
            resolve({
              success: false,
              message: "Can't update! Group with this colour already exist",
              data: err
            });
          }
      }
      })
  }

  else{
    resolve({
      success: false,
      message: "Unable to update Group",
      data: err
    });
  }
  });
}

export function removeGroup(id) {
  return new Promise((resolve, reject) => {
    let status = { isActive: false }
    Group.updateOne(
      { _id: id },
      { $set: status },
      (err, dep) => {
        if (!err) {
          
          resolve({
            success: true,
            message: "Group removed successfully",
            data: null
          });
        } else {
          
          resolve({
            success: false,
            message: "Unable to remove Group",
            data: err
          });
        }
      });

  });
}