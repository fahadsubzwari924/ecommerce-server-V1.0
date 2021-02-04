"use strict";

import { Router } from "express";
import { log, loggedIn } from "./middlewares/index";
import { addOrder, getOrders, updateOrder } from "./handlers/order";

export default class OrdersAPI {
    constructor() {
        this.router = Router();
        this.registerRoutes();
    }

    registerRoutes() {
        let router = this.router;

        router.post("/", log, addOrder);
        router.get("/", log, getOrders); // /api/order?page=1&limit=5
        router.put("/", log, updateOrder);
    }

    getRouter() {
        return this.router;
    }

    getRouteGroup() {
        return "/order";
    }
}