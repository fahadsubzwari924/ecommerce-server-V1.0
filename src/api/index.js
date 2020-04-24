'use strict';

import { Router } from "express";
import RootAPI from "./root";
import RoleAPI from "./roles";
import UserAPI from "./user";
import MenuAPI from "./menu";
import CategoriesAPI from './category';
import ProductAPI from './product';
import BrandAPI from './brand';
import BannerAPI from './banner';
import OrdersAPI from './order';


export default class Api {
    constructor(app) {
        this.app = app;
        this.router = Router();
        this.routeGroups = [];
    }

    loadRouteGroups() {
        this.routeGroups.push(new RootAPI());

        this.routeGroups.push(new RoleAPI());
        this.routeGroups.push(new UserAPI());
        this.routeGroups.push(new MenuAPI());
        this.routeGroups.push(new CategoriesAPI());
        this.routeGroups.push(new ProductAPI());
        this.routeGroups.push(new BrandAPI());
        this.routeGroups.push(new BannerAPI());
        this.routeGroups.push(new OrdersAPI());
    }

    setContentType(req, resp, next) {
        resp.set('Content-Type', 'text/json');
        next();
    }

    registerGroup() {
        this.loadRouteGroups();
        this.routeGroups.forEach(rg => {
            let setContentType = rg.setContentType ? rg.setContentType : this.setContentType;
            this.app.use('/api' + rg.getRouteGroup(), setContentType, rg.getRouter())
        });
    }
}