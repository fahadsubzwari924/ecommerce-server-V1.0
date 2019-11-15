"use strict";


import { generateResponse, parseBody } from "../../utilities";
import { saveProduct, findAllProducts, findProductById, editProduct, checkGroupByName, checkGroupByColour, removeProduct } from "../../models/product";
import { Product } from './../../models/product';
import { Gateway } from './../../models/gateway'
const multer = require('multer');
const uploadFolder = 'uploads/';
const fs = require('fs-extra');



// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
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

// var upload = multer({
//     storage: storage
// }).array('image');





export async function addProduct(req, res) {
    let productImages = [];
    try {
        let body = parseBody(req)
        if (body) {
            if (req.files['image']) {
                req.files['image'].forEach(item => {
                    productImages.push(item.filename)
                })
                body.images = pictures
            }
            if (req.files['thumbnail_image']) {
                // body.coverImage = req.files['cover_image'][0].filename;
                body.thumnbnailImage = req.files['thumbnail_image'][0].filename;
            }
            let newPath = `uploads/${body.categoryName}/${req.files['thumbnail_image'][0].filename}`;
            body.thumnbnailImage = newPath;
            let product = await saveProduct(body)
            if (product) {
                fs.move(`temp/${req.files['thumbnail_image'][0].filename}`, newPath).then(() => {
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
    } catch (err) {
        console.log('----------Error---------', err)
        generateResponse(false, 'Error occured, 404 not found!', err, res)
    }
}

export async function getAllProducts(req, res) {
    try {
        let products = await findAllProducts()
        if (products) {
            generateResponse(products.success, products.message, products.data, res)
        }
    } catch (err) {
        generateResponse(false, 'Error occured, 404 not found!', err, res)
    }
}

export async function getProductById(req, res) {
    try {
        let id = req.params.id
        let product = await findProductById(id)
        if (product) {
            generateResponse(product.success, product.message, product.data, res)
        }
    } catch (err) {
        generateResponse(false, 'Error occured, 404 not found!', err, res)
    }
}

export async function updateProduct(req, res) {
    try {
        let body = parseBody(req)
        if (body) {
            let product = await editProduct(body)
            if (product) {
                generateResponse(product.success, product.message, null, res)
            }
        } else {
            generateResponse(false, "Please provide complete info", null, res)
        }
    } catch (err) {
        generateResponse(false, 'Error occured, 404 not found!', err, res)
    }
}

export async function deleteProduct(req, res) {
    let id = req.params.id
    if (id) {
        let product = await removeProduct(id)
        if (product) {
            generateResponse(product.success, product.message, product.data, res)
        }
    }
}