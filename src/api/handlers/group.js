"use strict";


import { generateResponse, parseBody } from "../../utilities";
import { saveGroup, findAllGroup, findGroupById, editGroup, checkGroupByName, checkGroupByColour, removeGroup } from "../../models/group";


export async function addGroup(req, res) {
  try {
    let body = parseBody(req)
    if (body) {
      let group = await saveGroup(body)
      if (group) {
        generateResponse(group.success, group.message, group.data, res)
      }
    } else {
      generateResponse(false, "Please provide complete info", null, res)
    }
  }
  catch (err) {
    generateResponse(false, 'Error occured, 404 not found!', err, res)
  }
}

export async function getAllGroups(req, res) {
  try {
    let groups = await findAllGroup()
    if (groups) {
      generateResponse(groups.success, groups.message, groups.data, res)
    }
  }
  catch (err) {
    generateResponse(false, 'Error occured, 404 not found!', err, res)
  }
}

export async function getGroupById(req, res) {
  try {
    let id = req.params.id
    let group = await findGroupById(id)
    if (group) {
      generateResponse(group.success, group.message, group.data, res)
    }
  }
  catch (err) {
    generateResponse(false, 'Error occured, 404 not found!', err, res)
  }
}

export async function updateGroup(req, res) {
  try {
    let body = parseBody(req)
    if (body) {
      let group = await editGroup(body)
      if (group) {
        generateResponse(group.success, group.message, null, res)
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

export async function deleteGroup(req, res) {
  let id = req.params.id
  if (id) {
    let group = await removeGroup(id)
    if (group) {
      generateResponse(group.success, group.message, group.data, res)
    }
  }
}