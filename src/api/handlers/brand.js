"use strict";


import { generateResponse, parseBody } from "../../utilities";
import { saveBrand, findAllBrands, findBrandById, editBrand, removeBrand, findAllBrandsOfCategories } from "../../models/brand";


export async function addBrand(req, res) {
    try {
        let body = parseBody(req)
        if (body) {
            let brand = await saveBrand(body)
            if (brand) {
                generateResponse(brand.success, brand.message, brand.data, res)
            }
        } else {
            generateResponse(false, "Please provide complete info", null, res)
        }
    } catch (err) {
        generateResponse(false, 'Error occured, 404 not found!', err, res)
    }
}

export async function getAllBrands(req, res) {
    try {
        let brnads = await findAllBrands()
        if (brnads) {
            generateResponse(brnads.success, brnads.message, brnads.data, res)
        }
    } catch (err) {
        generateResponse(false, 'Error occured, 404 not found!', err, res)
    }
}

export async function getAllBrandsOfCategory(req, res) {
    let categoryId = req.params.cat_id;
    try {
        let brands = await findAllBrandsOfCategories(categoryId)
        if (brands) {
            generateResponse(brands.success, brands.message, brands.data, res)
        }
    } catch (err) {
        generateResponse(false, 'Error occured, 404 not found!', err, res)
    }
}

export async function getBrandById(req, res) {
    try {
        let id = req.params.id
        let brand = await findBrandById(id)
        if (brand) {
            generateResponse(brand.success, brand.message, brand.data, res)
        }
    } catch (err) {
        generateResponse(false, 'Error occured, 404 not found!', err, res)
    }
}

export async function updateBrand(req, res) {
    try {
        let body = parseBody(req)
        if (body) {
            let brand = await editBrand(body)
            if (brand) {
                generateResponse(brand.success, brand.message, brand.data, res)
            }
        } else {
            generateResponse(false, "Please provide complete info", null, res)
        }
    } catch (err) {
        console.log('Error : ', err)
        generateResponse(false, 'Error occured, 404 not found!', err, res)
    }
}

export async function deleteBrand(req, res) {
    let id = req.params.id
    if (id) {
        let brand = await removeBrand(id)
        if (brand) {
            generateResponse(brand.success, brand.message, brand.data, res)
        }
    }
}