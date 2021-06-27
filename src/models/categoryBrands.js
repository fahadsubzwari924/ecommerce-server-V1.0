import { ObjectId } from "mongodb";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;


export var CategoryBrands = mongoose.model(
    'category_brands',
    new Schema({
        categoryId: { type: Schema.Types.ObjectId, ref: "category", null: true },
        brandId: { type: Schema.Types.ObjectId, ref: "brand", null: true },
        createdAt: { type: Date, default: Date.now }
    })
);

export function getBrandsByCategoryId(id) {
    return new Promise(async (resolve, reject) => {
        try {
            const brands = await CategoryBrands.find({ categoryId: ObjectId(id) }).populate('brandId').exec();
            if (brands && brands.length) {
                resolve({
                    status: true,
                    message: 'brands get successfully',
                    data: brands
                })
            } else {
                resolve({
                    status: true,
                    message: 'brands not found',
                    data: []
                })
            }  
        } catch (error) {
            reject({
                status: false,
                message: error,
                data: null
            })
        }

    })
}