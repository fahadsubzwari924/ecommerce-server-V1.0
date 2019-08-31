"use strict";

import { Router } from "express";
import { log, loggedIn } from "./middlewares/index";
import { addGroup, getAllGroups, getGroupById, updateGroup, deleteGroup } from "./handlers/group";


export default class GroupAPI {
  constructor() {
    this.router = Router();
    this.registerRoutes();
  }

  registerRoutes() {
    let router = this.router;

    router.post("/", log,loggedIn, addGroup);
    router.get("/", log,loggedIn, getAllGroups);
    router.get("/:id", log,loggedIn, getGroupById);
    router.put("/", log,loggedIn, updateGroup);
    router.delete('/:id',log,loggedIn,deleteGroup)



  }

  getRouter() {
    return this.router;
  }

  getRouteGroup() {
    return "/group";
  }
}
