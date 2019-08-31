"use strict";

import { Router } from "express";
import { log, loggedIn } from "./middlewares/index";
import { addConfiguration, getConfiguration, updateConfiguration } from "./handlers/configuration";


export default class ConfigurationAPI {
  constructor() {
    this.router = Router();
    this.registerRoutes();
  }

  registerRoutes() {
    let router = this.router;

    router.post("/", log, loggedIn, addConfiguration);
    router.get("/", log, loggedIn, getConfiguration);
    router.put("/", log, loggedIn, updateConfiguration);
  }

  getRouter() {
    return this.router;
  }

  getRouteGroup() {
    return "/configuration";
  }
}
