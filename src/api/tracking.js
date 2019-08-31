"use strict";

import { Router } from "express";
import { log, loggedIn } from "./middlewares/index";
import { addTracking, getAllTrackings, getTrackingById, updateTracking, getEmployeeTrackingRecord, sendData, filterData } from "./handlers/tracking";


export default class TrackingAPI {
  constructor() {
    this.router = Router();
    this.registerRoutes();
  }

  registerRoutes() {
    let router = this.router;

    router.post("/", log, addTracking);
    router.get("/", log, loggedIn, getAllTrackings);
    router.get("/:id", log, loggedIn, getTrackingById);
    router.get("/", log, loggedIn, updateTracking);
    router.post('/record', log, loggedIn, getEmployeeTrackingRecord)
    router.get('/live/data',log,loggedIn,sendData)
    router.post('/filter',log,filterData)
  }

  getRouter() {
    return this.router;
  }

  getRouteGroup() {
    return "/tracking";
  }
}
