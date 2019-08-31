"use strict";

import { Router } from "express";
import { log, loggedIn } from "./middlewares/index";
import { addEmployee, getAllEmployees, getEmployeeById, updateEmployee, deleteEmployee } from "./handlers/employee";


export default class EmployeeAPI {
  constructor() {
    this.router = Router();
    this.registerRoutes();
  }

  registerRoutes() {
    let router = this.router;

    router.post('/', log,loggedIn, addEmployee)
    router.get('/', log,loggedIn, getAllEmployees)
    router.get('/:id', log,loggedIn, getEmployeeById)
    router.put('/', log,loggedIn, updateEmployee)
    router.delete('/:id',log,loggedIn,deleteEmployee)


  }

  getRouter() {
    return this.router;
  }

  getRouteGroup() {
    return "/employee";
  }
}
