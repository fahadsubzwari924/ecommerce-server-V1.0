'use strick';

import { generateResponse, parseBody } from "../../utilities";
import { saveOrder, editBanner, removeBanner, getAllBanners } from '../../models/order';


export async function addOrder(req, res) {
    try {
        let body = parseBody(req)
        if (body) {
            let order = await saveOrder(body)
            if (order) {
                generateResponse(order.success, order.message, order.data, res)
            }
        } else {
            generateResponse(false, "Please provide complete info", null, res)
        }
    } catch (err) {
        generateResponse(false, 'Error occured, 404 not found!', err, res)
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