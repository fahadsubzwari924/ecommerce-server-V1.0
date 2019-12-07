"use strict";

import { Router } from "express";
import { log, loggedIn } from "./middlewares/index";
import { addProduct, getAllProducts, getProductById, updateProduct, deleteProduct, getAllLatestProducts, getProductOfBrand } from "./handlers/product";
const multer = require('multer');
const uploadFolder = 'uploads/';
const fs = require('fs');


// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         console.log(req.body, 'name')
//         if (fs.existsSync(`uploads/${req.body.categoryName}`)) {
//             cb(null, `uploads/${req.body.categoryName}`);
//         } else {
//             fs.mkdir(`uploads/${req.body.categoryName}`, err => {
//                 if (err) {
//                     console.log('err in creating folder', err);
//                 } else {
//                     cb(null, `uploads/${req.body.categoryName}`);
//                 }
//             });
//         }
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname);
//     }
// });

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // console.log(file, 'in multer')
        if (fs.existsSync(`temp/`)) {
            cb(null, `temp/`);
        } else {
            fs.mkdir(`temp/`, err => {
                if (err) {
                    console.log('err in creating folder', err);
                } else {
                    cb(null, `temp/`);
                }
            });
        }
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

var upload = multer({
    storage: storage
})




export default class ProductAPI {
    constructor() {
        this.router = Router();
        this.registerRoutes();
    }

    registerRoutes() {
        let router = this.router;

        router.post("/", log, upload.fields([{ name: 'image' }, { name: 'cover_image' }, { name: 'thumbnail_image' }]), addProduct);
        router.get("/", log, getAllProducts);
        router.get('/type/:type', log, getAllLatestProducts)
        router.get('/brand/:brnd_id', log, getProductOfBrand)
        router.get("/:id", log, getProductById);
        router.put("/", log, updateProduct);
        router.delete('/:id', log, deleteProduct)
        

    }

    getRouter() {
        return this.router;
    }

    getRouteGroup() {
        return "/product";
    }
}