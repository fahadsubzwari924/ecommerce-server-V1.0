"use strict";

import { Router } from "express";
import { log, loggedIn } from "./middlewares/index";
import { addGateway, getAllGateways, getGatewayById, updateGateway, deleteGateway, checkGateway } from "./handlers/gateway";


export default class GatewayAPI {
  constructor() {
    this.router = Router();
    this.registerRoutes();
  }

  registerRoutes() {
    let router = this.router;

    router.post('/', log, loggedIn, addGateway)
    router.get('/', log, loggedIn, getAllGateways)
    router.get('/:id', log, loggedIn, getGatewayById)
    router.put('/', log, loggedIn, updateGateway)
    router.delete('/:id',log,loggedIn,deleteGateway)
    router.post('/check',log,loggedIn,checkGateway)


  }

  getRouter() {
    return this.router;
  }

  getRouteGroup() {
    return "/gateway";
  }
}
