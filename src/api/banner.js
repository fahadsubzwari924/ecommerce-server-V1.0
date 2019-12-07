
import { Router } from "express";
import { log, loggedIn } from "./middlewares/index";
import { addBanner, updateBanner, deleteBanner, getAllBanner } from "./handlers/banner";
const multer = require('multer');
const uploadFolder = 'uploads/';
const fs = require('fs');


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

export default class BannerAPI {

    constructor() {
        this.router = Router();
        this.registerRoutes();
    }

    registerRoutes() {
        let router = this.router;

        router.post("/", log, upload.fields([{ name: 'banner_image' }]), addBanner);
        router.get("/", log, getAllBanner);
        // router.get('/type/:type', log, getAllLatestProducts)
        // router.get("/:id", log, getProductById);
        router.put("/", log, updateBanner);
        router.delete('/:id', log, deleteBanner)

    }

    getRouter() {
        return this.router;
    }

    getRouteGroup() {
        return "/banner";
    }

}