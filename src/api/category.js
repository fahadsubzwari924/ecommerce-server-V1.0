"use strict";

import { Router } from "express";
import { log, loggedIn } from "./middlewares/index";
import { getAllCategories, getCategoryById, addCategory, updateCategory,getSubCategories,deleteCategory } from "./handlers/category";


export default class CategoriesAPI {
  constructor() {
    this.router = Router();
    this.registerRoutes();
  }

  registerRoutes() {
    let router = this.router;

    router.post("/", log, addCategory);
    router.get("/", log, getAllCategories);
    router.get("/:id", log, loggedIn, getCategoryById);
    router.put("/edit", log, updateCategory);
    router.post('/sub',log,getSubCategories)
    router.delete('/:id',deleteCategory)
    // router.delete('/:id', log, loggedIn, deleteAllBuildingData)



  }

  getRouter() {
    return this.router;
  }

  getRouteGroup() {
    return "/category";
  }
}
