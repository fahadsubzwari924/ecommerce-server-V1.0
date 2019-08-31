"use strict";

import { Router } from "express";
import { log, loggedIn } from "./middlewares/index";
import { addProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from "./handlers/product";


export default class ProductAPI {
  constructor() {
    this.router = Router();
    this.registerRoutes();
  }

  registerRoutes() {
    let router = this.router;

    router.post("/", log, addProduct);
    router.get("/", log, getAllProducts);
    router.get("/:id", log, getProductById);
    router.put("/", log, updateProduct);
    router.delete('/:id',log,deleteProduct)



  }

  getRouter() {
    return this.router;
  }

  getRouteGroup() {
    return "/product";
  }
}
