import { deleteGatewayFromFloor } from "./gateway";
import { deleteAllFloorApartments } from "./appartment";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Category = mongoose.model(
  "category",
  new Schema({
    name: String,
    desc : String,
    icon : String,
    parent : String,
    currentCategoryPath : String,
    displayLabel : String,
    createdAt: String,
    updatedAt: String,
    icon : String,
    isActive: { type: Boolean, default: true }
  })
);

export function saveCategory(obj) {
  return new Promise((resolve, reject) => {
    Category.find({ name: obj.catName, isActive: true }).exec((err, docs) => {
      if (docs) {
        if (docs.length == 0) {
          obj.createdAt = Date.now()
          obj.updatedAt = Date.now()
          var category = new Category(obj)
          category.save(function (err, data) {

            if (!err) {
              resolve({
                success: true,
                message: "Category added Successfully",
                data
              });
            }
            else {
              resolve({
                success: false,
                message: "Unable to add Category",
                data: err
              });
            }
          })
        }
        else {

          resolve({
            success: false,
            message: "Category already exist",
            data: null
          });
        }
      }
    })
  })

}

export function findAllRootCategories() {
  return new Promise((resolve, reject) => {
    Category.find({ parent : '/', isActive: true }).exec((err, docs) => {
      if (!err) {
        resolve({
          success: true,
          message: "Categories fetched successfully",
          data: docs
        });
      } else {
        resolve({
          success: false,
          message: "Can't find Categories",
          data: null
        });
      }
    });
  });
}

export function findAllSubCategories(body) {
  let parentCategoryPath = body.parent
  return new Promise((resolve, reject) => {
    Category.find({ parent : new RegExp(parentCategoryPath), isActive: true }).exec((err, docs) => {
      if (!err) {
        resolve({
          success: true,
          message: "Sub categories of category fetched successfully",
          data: docs
        });
      } else {
        resolve({
          success: false,
          message: "Can't find Sub categories",
          data: null
        });
      }
    });
  });
}
export function findCategoryById(id) {
  return new Promise((resolve, reject) => {
    Category.findById(id).populate('subCategories').exec((err, docs) => {
      if (!err) {

        resolve({
          success: true,
          message: "Category fetched successfully",
          data: docs
        });
      } else {

        resolve({
          success: false,
          message: "Can't find Category",
          data: null
        });
      }
    });
  });
}
export function editCategory(body){
  return new Promise((resolve,reject)=>{
    console.log(body,'body')
    let id = body._id;
    delete body._id;
    Category.findById({_id : id}).exec((err,docs)=>{
      console.log(docs,'docs')
      if (docs) {
        Category.updateOne({ _id: id },{ $set: body },(err,categoryUpdate)=>{
          if (!err) {
            resolve({
              success: true,
              message: "Category updated successfully",
              data: categoryUpdate
            });
          }else{
            resolve({
              success: false,
              message: "Error in updating category",
              data: err
            });
          }
        })
      }else{
        resolve({
          success: false,
          message: "Category not found",
          data: err
        });
      }
    })
  })
}
// export function editCategory(body) {
//   return new Promise((resolve, reject) => {
//     let id = body.id;
//     delete body.id
//     Category.find({ name: body.catName, isActive: true }).exec((err, docs) => {

//       if (docs) {
//         if (docs.length == 0) {
//           body.updatedAt = Date.now()
//           Category.updateOne(
//             { _id: id },
//             { $set: body },
//             (err, dep) => {
//               if (!err) {

//                 resolve({
//                   success: true,
//                   message: "Category updated successfully",
//                   data: null
//                 });
//               } else {

//                 resolve({
//                   success: false,
//                   message: "Unable to update Category",
//                   data: err
//                 });
//               }
//             });
//         } else {

//           resolve({
//             success: false,
//             message: "Category already exist",
//             data: err
//           });
//         }
//       }
//     })
//   });
// }

// export function findAllFloorsOfBuilding(id) {
//   return new Promise((resolve, reject) => {
//     Floor.find({ buildingId: id, isActive: true }).populate('buildingId').exec((err, docs) => {
//       if (!err) {

//         resolve({
//           success: true,
//           message: "Floor fetched successfully",
//           data: docs
//         });
//       } else {

//         resolve({
//           success: false,
//           message: "Can't find Floor",
//           data: null
//         });
//       }
//     });
//   });
// }


export function removeCategory(id) {
  return new Promise((resolve, reject) => {
    Category.findByIdAndRemove({ _id: id },(err, link) => {
      if (!err) {
        resolve({
          success: true,
          message: "Category removed successfully",
          data: null
        });
      } else {

        resolve({
          success: false,
          message: "Unable to remove category",
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

// export async function saveAllFloors(obj) {
//   let buildingId = obj.buildingId
//   let count = obj.count
//   let flCount = await Floor.countDocuments({ buildingId: buildingId }).exec()
//   if (flCount == 0) {
//     for (var i = 1; i <= count; i++) {
//       let obj = {
//         floorNo: `Floor-${i}`,
//         buildingId: buildingId,
//         createdAt: Date.now(),
//         updatedAt: Date.now()
//       }
//       var floor = new Floor(obj)
//       floor.save(function (err, docs) {
//         if (!err) {
//           console.log("Floor Saved", docs)
//         }
//       })
//     }
//     return true;
//   }
//   else {
//     flCount += 1
//     count += flCount
//     for (var i = flCount; i <= count; i++) {
//       let obj = {
//         floorNo: `Floor-${i}`,
//         buildingId: buildingId,
//         createdAt: Date.now(),
//         updatedAt: Date.now()
//       }
//       var floor = new Floor(obj)
//       floor.save(function (err, docs) {
//         if (!err) {
//           console.log("Floor Saved", docs)
//         }
//       })
//     }
//     return true;
//   }
// }

// export async function deleteFloors(id) {
//   let gateway = await deleteGatewayFromFloor(id)
//   if (gateway == true) {
//     let apartment = await deleteAllFloorApartments(id)
//     if (apartment == true) {
//       let floor = await Floor.deleteOne({ _id: id }).exec()
//       if (floor) {
//         return ({ success: true, message: "Gateway unassigned and Floor deleted successfully", data: floor })
//       }
//       else {
//         return ({ success: false, message: "Unable to delete floor", data: null })
//       }
//     }
//     else {
//       return ({ success: false, message: "Unable to delete floor", data: null })
//     }
//   }
//   else {
//     let apartment = await deleteAllFloorApartments(id)
//     if (apartment == true) {
//       let floor = await Floor.deleteOne({ _id: id }).exec()
//       if (floor) {
//         return ({ success: true, message: "Floor deleted successfully", data: floor })
//       }
//       else {
//         return ({ success: false, message: "Unable to delete floor", data: null })
//       }
//     }
//     else {
//       return ({ success: false, message: "Unable to delete floor", data: null })
//     }
//   }
// }

// export async function deleteAllFloorsOfBuilding(id) {
//   let floor = await Floor.deleteMany({ buildingId: id }).exec()
//   if (floor) {
//     return true
//   }
//   else {
//     return false
//   }
// }