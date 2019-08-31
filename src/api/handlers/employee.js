"use strict";


import { generateResponse, parseBody } from "../../utilities";
import { saveEmployee, findAllEmployee, findEmployeeById, editEmployee, checkEmployeeByBle, checkEmployeeByEmail, removeEmployee } from "../../models/employee";


export async function addEmployee(req, res) {
  try {
    let body = parseBody(req)
    if (body) {
      let resp = await saveEmployee(body)
      console.log(resp)
      if (resp) {
        generateResponse(resp.success, resp.message, resp.data, res)
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

export async function getAllEmployees(req, res) {
  try {
    let employees = await findAllEmployee()
    if (employees) {
      generateResponse(employees.success, employees.message, employees.data, res)
    }
  }
  catch (err) {
    generateResponse(false, 'Error occured, 404 not found!', err, res)
  }
}

export async function getEmployeeById(req, res) {
  try {
    let id = req.params.id
    let employee = await findEmployeeById(id)
    if (employee) {
      generateResponse(employee.success, employee.message, employee.data, res)
    }
  }
  catch (err) {
    generateResponse(false, 'Error occured, 404 not found!', err, res)
  }
}

export async function updateEmployee(req, res) {
  try {
    let body = parseBody(req)
    if (body){
      let employee = await editEmployee(body)
      if (employee) {
      generateResponse(employee.success, employee.message, employee.data, res)
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

export async function deleteEmployee(req, res) {
  let id = req.params.id
  if (id) {
    let employee = await removeEmployee(id)
    if (employee) {
      generateResponse(employee.success, employee.message, employee.data, res)
    }
  }
}
