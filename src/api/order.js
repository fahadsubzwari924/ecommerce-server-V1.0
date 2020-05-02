"use strict";

import { Router } from "express";
import { log, loggedIn } from "./middlewares/index";
import { addOrder, getOrders } from "./handlers/order";


export default class OrdersAPI {
    constructor() {
        this.router = Router();
        this.registerRoutes();
    }

    registerRoutes() {
        let router = this.router;

        router.post("/", log, addOrder);
        router.get('/', log, getOrders);
        // router.get("/", log, getAllCategories);
        // router.get('/all', log, getAllTotalCategories)
        // router.get("/:id", log, loggedIn, getCategoryById);
        // router.put("/edit", log, updateCategory);
        // router.post('/sub', log, getSubCategories)
        // router.delete('/:id/:name', log, deleteCategory)
        // router.post('/decendentCategory', log, getDecendenctCategories)

    }

    getRouter() {
        return this.router;
    }

    getRouteGroup() {
        return "/order";
    }
}