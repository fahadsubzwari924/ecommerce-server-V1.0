'use strict';

import {Router} from "express";
import RootAPI from "./root";
import BleAPI from "./ble";
import GatewayAPI from "./gateway";
import EmployeeAPI from "./employee";
import BuildingAPI from "./building";
import AppartmentAPI from "./appartment";
import FloorAPI from "./floor";
import GroupAPI from "./group";
import TrackingAPI from "./tracking";
import RoleAPI from "./roles";
import UserAPI from "./user";
import MenuAPI from "./menu";
import ConfigurationAPI from "./configuration";
import CategoriesAPI from './category';
import ProductAPI from './product';



export default class Api {
    constructor(app) {
        this.app = app;
        this.router = Router();
        this.routeGroups = [];
    }

    loadRouteGroups() {
        this.routeGroups.push(new RootAPI());
        this.routeGroups.push(new AppartmentAPI());
        this.routeGroups.push(new BleAPI());
        this.routeGroups.push(new BuildingAPI());
        this.routeGroups.push(new EmployeeAPI());
        this.routeGroups.push(new FloorAPI());
        this.routeGroups.push(new GatewayAPI());
        this.routeGroups.push(new GroupAPI());
        this.routeGroups.push(new TrackingAPI());
        this.routeGroups.push(new RoleAPI());
        this.routeGroups.push(new UserAPI());
        this.routeGroups.push(new MenuAPI());
        this.routeGroups.push(new ConfigurationAPI());
        this.routeGroups.push(new CategoriesAPI());
        this.routeGroups.push(new ProductAPI());




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
