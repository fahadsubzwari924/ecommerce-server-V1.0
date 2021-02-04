"use strick";

import { generateResponse, parseBody, paginateApi } from "../../utilities";
import {
    saveOrder,
    editBanner,
    removeBanner,
    getAllBanners,
    getAllOrders,
    updateOrderStatus,
} from "../../models/order";
import { Order } from "../../models/order";

export async function addOrder(req, res) {
    try {
        let body = parseBody(req);
        if (body) {
            let order = await saveOrder(body);
            if (order) {
                generateResponse(order.success, order.message, order.data, res);
            }
        } else {
            generateResponse(false, "Please provide complete info", null, res);
        }
    } catch (err) {
        console.log(err);
        generateResponse(false, "Error occured, 404 not found!", err, res);
    }
}
export async function updateOrder(req, res) {
    try {
        let body = parseBody(req);
        if (body) {
            let order = await updateOrderStatus(body);
            console.log("order ----> ", order);
            if (order) {
                generateResponse(order.success, order.message, null, res);
            }
        } else {
            generateResponse(false, "Please provide complete info", null, res);
        }
    } catch (err) {
        console.log(err);
        generateResponse(false, "Error occured, 404 not found!", err, res);
    }
}

export async function deleteBanner(req, res) {
    let id = req.params.id;
    if (id) {
        let banner = await removeBanner(id);
        if (banner) {
            generateResponse(banner.success, banner.message, banner.data, res);
        }
    }
}

export async function getOrders(req, res) {
    try {
        let orders = await paginateApi(req, Order, "userId");
        if (orders.status) {
            generateResponse(orders.success, "Orders fetched", orders.data, res);
        }
    } catch (error) {
        console.log(error);
        generateResponse(false, "Error occured, 404 not found!", error, res);
    }
}