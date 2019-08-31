"use strict";

import { Router } from "express";
import { log, loggedIn } from "./middlewares/index";
import { addFloor, getAllFloors, getFloorById, updateFloor, getAllFloorsOfBuilding, addFloorsOfBuilding, removeAllDataOfFloor } from "./handlers/floor";

export default class FloorAPI {
  constructor() {
    this.router = Router();
    this.registerRoutes();
  }

  registerRoutes() {
    let router = this.router;

    router.post("/", log, loggedIn, addFloor);
    router.get("/", log, loggedIn, getAllFloors);
    router.get("/:id", log, loggedIn, getFloorById);
    router.put("/", log, loggedIn, updateFloor);
    router.get('/building/:id', log, loggedIn, getAllFloorsOfBuilding)
    router.delete('/:id', log, loggedIn, removeAllDataOfFloor)
    router.post('/save', log, loggedIn, addFloorsOfBuilding)



  }

  getRouter() {
    return this.router;
  }

  getRouteGroup() {
    return "/floor";
  }
}
