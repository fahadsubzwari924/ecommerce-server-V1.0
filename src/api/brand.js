"use strict";

import { Router } from "express";
import { log, loggedIn } from "./middlewares/index";
import { addBrand, getAllBrands, getBrandById, updateBrand, deleteBrand, getAllBrandsOfCategory } from "./handlers/brand";







export default class BrandAPI {
    constructor() {
        this.router = Router();
        this.registerRoutes();
    }

    registerRoutes() {
        let router = this.router;

        router.post("/", log, addBrand);
        router.get("/", log, getAllBrands);
        router.get('/:cat_id', log, getAllBrandsOfCategory)
        router.get("/:id", log, getBrandById);
        router.put("/", log, updateBrand);
        router.delete('/:id', log, deleteBrand)



    }

    getRouter() {
        return this.router;
    }

    getRouteGroup() {
        return "/brand";
    }
}