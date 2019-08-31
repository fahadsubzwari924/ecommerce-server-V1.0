'use strict';

import {Router} from "express";
import {log, loggedIn} from "./middlewares/index";
import {addMenu,fetchMenu } from "./handlers/menu";

export default class MenuAPI {
    constructor() {
        this.router = Router();
        this.registerRoutes();
    }

    registerRoutes() {
        let router = this.router;
       
        router.post('/',log, addMenu)
        router.get('/',log, loggedIn, fetchMenu)
        

        
    }

    getRouter() {
        return this.router;
    }

    getRouteGroup() {
        return '/menu';
    }
}