"use strict";


import { generateResponse, parseBody } from "../../utilities";
import { saveCategory, findAllRootCategories, findCategoryById, editCategory, removeCategory,findAllSubCategories } from "../../models/category";


export async function addCategory(req, res) {
  try {
    let body = parseBody(req)
    if (body) {
      let category = await saveCategory(body)
      if (category) {
        generateResponse(category.success, category.message, category.data, res)
      }
    }
    else {
      generateResponse(false, "Please provide complete info", null, res)
    }
  }
  catch (err) {
    generateResponse(false, 'Error occured, 404 not found!', err, res)
  }
}

export async function getAllCategories(req, res) {
  try {
    let categories = await findAllRootCategories()
    if (categories) {
      generateResponse(categories.success, categories.message, categories.data, res)
    }
  }
  catch (err) {
    generateResponse(false, 'Error occured, 404 not found!', err, res)
  }
}

export async function getSubCategories(req,res){
  let body = parseBody(req)
  try {
    let subCategories = await findAllSubCategories(body)
    if (subCategories) {
      generateResponse(subCategories.success, subCategories.message, subCategories.data, res)
    }
  }
  catch (err) {
    generateResponse(false, 'Error occured, 404 not found!', err, res)
  }
}

export async function getCategoryById(req, res) {
  try {
    let id = req.params.id
    let category = await findCategoryById(id)
    if (category) {
      generateResponse(category.success, category.message, category.data, res)
    }
  }
  catch (err) {
    generateResponse(false, 'Error occured, 404 not found!', err, res)
  }
}

export async function updateCategory(req, res) {
  try {
    let body = parseBody(req)
    if (body) {
      body.updatedAt = Date.now()
      let category = await editCategory(body)
      if (category) {
        generateResponse(category.success, category.message, null, res)
      }
    }
    else {
      generateResponse(false, "Please give complete info", null, res)
    }
  }
  catch (err) {
    generateResponse(false, 'Error occured, 404 not found!', err, res)
  }
}

// export async function getAllFloorsOfBuilding(req, res) {
//   try {
//     let buildingId = req.params.id
//     if (buildingId) {
//       let floor = await findAllFloorsOfBuilding(buildingId)
//       if (floor) {
//         generateResponse(floor.success, floor.message, floor.data, res)
//       }
//     }
//     else {
//       generateResponse(false, "Please provide buildingId", null, res)
//     }
//   }
//   catch (err) {
//     generateResponse(false, 'Error occured, 404 not found!', err, res)
//   }
// }

export async function deleteCategory(req,res) {
  try{
    let id = req.params.id;
    if (id) {
      let category = await removeCategory(id);
      if (category) {
        generateResponse(category.success, category.message, category.data, res)
      }
    }
  }
  catch (err) {
    generateResponse(false, 'Error occured, 404 not found!', err, res)
  }
}


// export async function deleteFloor(req, res) {
//   try {
//     let id = req.params.id
//     if (id) {
//       let floor = await removeFloor(id)
//       if (floor) {
//         generateResponse(floor.success, floor.message, floor.data, res)
//       }
//     }
//   }
//   catch (err) {
//     generateResponse(false, 'Error occured, 404 not found!', err, res)
//   }

// }

// export async function addFloorsOfBuilding(req,res){
//   let body = parseBody(req)
//   if(body){
//     let floor = await saveAllFloors(body)
//     if(floor){
//       generateResponse(true,"Floors added successfully",null,res)
//     }
//     else{
//       generateResponse(false,"Unable to add floors",null,res)
//     }
//   }
//   else{
//     generateResponse(false,"Please provide complete info",null,res)
//   }
// }

// export async function removeAllDataOfFloor(req, res) {
//   let id = req.params.id
//   if (id) {
//     let floor = await deleteFloors(id)
//     if (floor) {
//       generateResponse(floor.success, floor.message, floor.data, res)
//     }
//   }
//   else {
//     generateResponse(false, "Please provide complete info", null, res)
//   }
// }