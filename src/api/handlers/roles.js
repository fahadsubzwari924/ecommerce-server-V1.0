"use strict";


import { generateResponse, parseBody } from "../../utilities";
import { saveRole, findAllRole, findRoleById, editRole, findRoleBySlug } from "../../models/roles";


export async function addRole(req, res) {
  try{
  let body = parseBody(req)
  let chk  = await findRoleBySlug(body.slug)
  if(chk){
    if(chk.length == 0){
      body.createdAt = Date.now()
      body.updatedAt = Date.now()
      let resp = await saveRole(body)
      if (resp) {
        generateResponse(true, "Role added", resp, res)
      }
      else {
        generateResponse(false, "Can't add Role", null, res)
      }
    }
    else{
      generateResponse(false,"Role already exist",null,res)
    }
  }
  else{
    generateResponse(false,"Error occured while adding role",null,res)
  }
}
catch(err){
  generateResponse(false,'Error occured, 404 not found!',err,res)
}
}

export async function getAllRoles(req, res) {
  try{
  let roles = await findAllRole()
  if (roles) {
    generateResponse(true, "All Roles fetched", roles, res)
  }
  else {
    generateResponse(false, "No Roles found", null, res)
  }
}
catch(err){
  generateResponse(false,'Error occured, 404 not found!',err,res)
}
}

export async function getRoleById(req, res) {
  try{
  let id = req.params.id
  let role = await findRoleById(id)
  if (role) {
    generateResponse(true, "Role fetched", role, res)
  }
  else {
    generateResponse(false, "Can't find Role", null, res)
  }
}
catch(err){
  generateResponse(false,'Error occured, 404 not found!',err,res)
}
}

export async function updateRole(req,res) {
  try{
  let body = parseBody(req)
  if (body) {
    body.updatedAt = Date.now()
    let role = await editRole(body)
    if(role){
      generateResponse(true,"Role updated",null,res)
    }
    else{
      generateResponse(false,"Can't update Role",null,res)
    }
  }
  else {
    generateResponse(false, "Please give complete info", null, res)
  }
}
catch(err){
  generateResponse(false,'Error occured, 404 not found!',err,res)
}
}

export async function getRoleBySlug(slug){
  try{
    if(slug){
    let role  = await findRoleBySlug(slug)
    if(role){
      return role[0]
    }
    else{
      return null
    }
  }
  else{
    console.log('provide slug of role')
  }
}
catch(err){
  generateResponse(false,'Error occured, 404 not found!',err,res)
}
}