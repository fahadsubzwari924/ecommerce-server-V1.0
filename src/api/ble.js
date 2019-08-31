"use strict";

import { Router } from "express";
import { log, loggedIn } from "../api/middlewares/index";
import { addBLE, getAllBLEs, getBLEById, updateBLE, deleteBLE } from "./handlers/ble";


export default class BleAPI {
  constructor() {
    this.router = Router();
    this.registerRoutes();
  }

  registerRoutes() {
    let router = this.router;

    router.post('/', log, loggedIn, addBLE)
    router.get('/', log, loggedIn, getAllBLEs)
    router.get('/:id', log, loggedIn, getBLEById)
    router.put('/', log, loggedIn, updateBLE)
    router.delete('/:id',log,loggedIn,deleteBLE)



  }

  getRouter() {
    return this.router;
  }

  getRouteGroup() {
    return "/ble";
  }
}
