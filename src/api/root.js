"use strict";

import { Router } from "express";
import { log, loggedIn } from "../api/middlewares/index";
import {
  DefaultHandler, getRealTimeData, getApartmentsOfBuilding, trackData, addPreRoles, addPreMenu, getAllBuildingData, getAllLocations, fetchRecord,
} from "./handlers/root";
import { saveKey } from "../models/key";
var multer = require('multer')
var upload = multer({
  dest: 'uploads/'
})


export default class RootAPI {
  constructor() {
    this.router = Router();
    this.registerRoutes();
  }

  registerRoutes() {
    let router = this.router;
    router.get("/", log, loggedIn, DefaultHandler);
    router.post('/realtime', log, loggedIn, getRealTimeData)
    router.get('/building/appartment', log, loggedIn, getApartmentsOfBuilding)
    router.get('/building/data/:id', log, loggedIn, getAllBuildingData)
    router.get('/location', log, loggedIn, getAllLocations)

    router.get('/pre/role',log,addPreRoles)
    // router.get('/pre/menu',log,addPreMenu)
    router.post('/key',log,saveKey)

    router.get('/data', log, fetchRecord)

  }

  getRouter() {
    return this.router;
  }

  getRouteGroup() {
    return "/";
  }
}
