"use strict";


import { generateResponse, parseBody } from "../../utilities";
import { saveProduct, findAllProducts, findProductById, editProduct, checkGroupByName, checkGroupByColour, removeProduct } from "../../models/product";
const multer = require('multer');

export async function addProduct(req, res) {
    try {
        let body = parseBody(req)
        if (body) {
            let group = await saveProduct(body)
            if (group) {
                generateResponse(group.success, group.message, group.data, res)
            }
        } else {
            generateResponse(false, "Please provide complete info", null, res)
        }
    } catch (err) {
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