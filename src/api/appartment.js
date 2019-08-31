"use strict";

import { Router } from "express";
import { log, loggedIn } from "./middlewares/index";
import { getAllAppartments, addAppartment, getAppartmentById, updateAppartment, getAppartmentsOfFloor, addApartmentsOfFloor, removeAllDataOfApartment } from "./handlers/appartment";


export default class AppartmentAPI {
  constructor() {
    this.router = Router();
    this.registerRoutes();
  }

  registerRoutes() {
    let router = this.router;

    router.post("/", log, loggedIn, addAppartment);
    router.get("/", log, loggedIn, getAllAppartments);
    router.get("/:id", log, loggedIn, getAppartmentById);
    router.put("/", log, loggedIn, updateAppartment);
    router.get("/floor/:id", log, loggedIn, getAppartmentsOfFloor)
    router.delete('/:id', log, loggedIn, removeAllDataOfApartment)
    router.post("/save", log, loggedIn, addApartmentsOfFloor);




  }

  getRouter() {
    return this.router;
  }

  getRouteGroup() {
    return "/appartment";
  }
}
