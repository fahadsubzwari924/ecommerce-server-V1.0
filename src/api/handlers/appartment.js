"use strict";


import { generateResponse, parseBody } from "../../utilities";
import { saveApartment, findAllApartment, findApartmentById, findAllApartmentsOfFloor, removeApartment, editApartment, saveAllApartments, deleteApartments } from "../../models/appartment";


export async function addAppartment(req, res) {
  let body = parseBody(req)
  try {
    let resp = await saveApartment(body)
    if (resp) {
      generateResponse(resp.success, resp.message, resp.data, res)
    }
  }
  catch (err) {
    generateResponse(false, 'Error occured, 404 not found!', err, res)
  }
}

export async function getAllAppartments(req, res) {
  try {
    let appartments = await findAllApartment()
    if (appartments) {
      generateResponse(appartments.success, appartments.message, appartments.data, res)
    }
  }
  catch (err) {
    generateResponse(false, 'Error occured, 404 not found!', err, res)
  }
}

export async function getAppartmentById(req, res) {
  try {
    let id = req.params.id
    let appartment = await findApartmentById(id)
    if (appartment) {
      generateResponse(appartment.success, appartment.message, appartment.data, res)
    }
  }
  catch (err) {
    generateResponse(false, 'Error occured, 404 not found!', err, res)
  }
}

export async function updateAppartment(req, res) {
  try {
    let body = parseBody(req)
    if (body) {
      let appartment = await editApartment(body)
      if (appartment) {
        generateResponse(appartment.success, appartment.message, appartment.data, res)
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

export async function getAppartmentsOfFloor(req, res) {
  try {
    let floorId = req.params.id
    if (floorId) {
      let appartments = await findAllApartmentsOfFloor(floorId)
      if (appartments) {
        generateResponse(appartments.success, appartments.message, appartments.data, res)
      }
    }
    else {
      generateResponse(false, "Please provide floor Id", null, res)
    }
  }
  catch (err) {
    generateResponse(false, 'Error occured, 404 not found!', err, res)
  }
}

// export async function deleteApartment(req, res) {
//   let id = req.params.id
//   if (id) {
//     let apartment = await removeApartment(id)
//     if (apartment) {
//       generateResponse(true, "Apartment deleted successfully", apartment, res)
//     }
//     else {
//       generateResponse(false, "Can't remove apartment", null, res)
//     }
//   }
// }

export async function addApartmentsOfFloor(req, res) {
  let body = parseBody(req)
  if (body) {
    let apartment = await saveAllApartments(body)
    if (apartment) {
      generateResponse(true, "Apartments added successfully", null, res)
    }
    else {
      generateResponse(false, "Unable to add apartments", null, res)
    }
  }
  else {
    generateResponse(false, "Please provide complete info", null, res)
  }
}

export async function removeAllDataOfApartment(req, res) {
  let id = req.params.id
  if (id) {
    let apartment = await deleteApartments(id)
    if (apartment) {
      generateResponse(apartment.success, apartment.message, apartment.data, res)
    }
  }
  else {
    generateResponse(false, "Please provide complete info", null, res)
  }
}