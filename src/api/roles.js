"use strict";

import { Router } from "express";
import { log, loggedIn } from "./middlewares/index";
import { getAllRoles, addRole, getRoleById, updateRole} from "./handlers/roles";


export default class RoleAPI {
  constructor() {
    this.router = Router();
    this.registerRoutes();
  }

  registerRoutes() {
    let router = this.router;

    router.post("/", log,addRole);
    router.get("/", log,getAllRoles);
    router.get("/:id", log,getRoleById);
    router.put("/", log,updateRole);
    // router.post('/slug',log,getRoleBySlug)

 
  }

  getRouter() {
    return this.router; 
  }

  getRouteGroup() {
    return "/role";
  }
}
