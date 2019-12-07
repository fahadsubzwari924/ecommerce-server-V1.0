'use strick';

import { generateResponse, parseBody } from "../../utilities";
import { saveBanner, editBanner, removeBanner, getAllBanners } from '../../models/banner';
const multer = require('multer');
const uploadFolder = 'uploads/';
const fs = require('fs-extra');


export async function addBanner(req, res) {
    let bannerImage = [];
    //console.log('Banner Object : ', req)

    try {
    
        let body = parseBody(req)
        if (body) {
            if (req.files['banner_image']) {
                // body.coverImage = req.files['cover_image'][0].filename;
                body.bannerImage = req.files['banner_image'][0].filename;
            }
            let newPath = `uploads/banner/${req.files['banner_image'][0].filename}`;
                body.bannerImage = newPath;
                let product = await saveBanner(body)
                if (product) {
                    fs.move(`temp/${req.files['banner_image'][0].filename}`, newPath)
                    .then(() => {
                        generateResponse(product.success, product.message, product.data, res)
                    })
                    .catch((err) => {
                        product.data.imageUploadError = err;
                        generateResponse(product.success, product.message, product.data, res)
                    })
                } 
        } else {
            generateResponse(false, "Please provide complete info", null, res)
        }
    } catch (error) {
        console.log('----------Error---------', error)
        generateResponse(false, 'Error occured, 404 not found!', error, res)
    }
}

export async function updateBanner(req, res) {
    try {
        let body = parseBody(req)
        if (body) {
            let banner = await editBanner(body)
            if (banner) {
                generateResponse(banner.success, banner.message, null, res)
            }
        } else {
            generateResponse(false, "Please provide complete info", null, res)
        }
    } catch (err) {
        generateResponse(false, 'Error occured, 404 not found!', err, res)
    }
}

export async function deleteBanner(req, res) {
    let id = req.params.id
    if (id) {
        let banner = await removeBanner(id)
        if (banner) {
            generateResponse(banner.success, banner.message, banner.data, res)
        }
    }
}

export async function getAllBanner(req, res) {

    try {
        let banners = await getAllBanners();
        if (banners) {
            generateResponse(banners.success, banners.message, banners.data, res)
        }
    } catch (error) {
        generateResponse(false, 'Error occured, 404 not found!', err, res)
    }
}