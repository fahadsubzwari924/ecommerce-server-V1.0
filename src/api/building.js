"use strict";

import { Router } from "express";
import { log, loggedIn } from "./middlewares/index";
import { getAllBuildings, getBuildingById, addBuilding, updateBuilding, deleteAllBuildingData } from "./handlers/building";


export default class BuildingAPI {
  constructor() {
    this.router = Router();
    this.registerRoutes();
  }

  registerRoutes() {
    let router = this.router;

    router.post("/", log, loggedIn, addBuilding);
    router.get("/", log, loggedIn, getAllBuildings);
    router.get("/:id", log, loggedIn, getBuildingById);
    router.put("/", log, loggedIn, updateBuilding);
    router.delete('/:id', log, loggedIn, deleteAllBuildingData)



  }

  getRouter() {
    return this.router;
  }

  getRouteGroup() {
    return "/building";
  }
}
