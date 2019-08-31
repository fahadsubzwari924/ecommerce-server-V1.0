"use strict";

import { Router } from "express";
import { log, loggedIn } from "./middlewares/index";
import { getAllUsers, addUser, getUserById, updateUser, loginUser, resetPassword, changePasswordOfUser } from "./handlers/user";


export default class UserAPI {
  constructor() {
    this.router = Router();
    this.registerRoutes();
  }

  registerRoutes() {
    let router = this.router;

    router.post("/", log, addUser);
    router.get("/", log, loggedIn, getAllUsers);
    router.get("/:id", log, loggedIn, getUserById);
    router.put("/", log, updateUser);
    router.put('/login', log, loginUser)
    router.post('/reset',log,resetPassword)
    router.put('/password',log,changePasswordOfUser)

  }

  getRouter() {
    return this.router;
  }

  getRouteGroup() {
    return "/user";
  }
}
