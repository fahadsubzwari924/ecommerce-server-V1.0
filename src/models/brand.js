var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Brand = mongoose.model(
    "brand",
    new Schema({
        name: String,
        category: { type: Schema.Types.ObjectId, ref: "category" },
        createdAt: String,
    })
);

export function saveBrand(obj) {
    return new Promise((resolve, reject) => {
        Brand.find({ name: obj.name }).exec((err, docs) => {
            if (docs) {
                if (docs.length == 0) {
                    obj.createdAt = Date.now()
                    var brand = new Brand(obj)
                    brand.save(function(err, data) {

                        if (!err) {
                            resolve({
                                success: true,
                                message: "Brand added Successfully",
                                data
                            });
                        } else {
                            resolve({
                                success: false,
                                message: "Unable to add Brand",
                                data: err
                            });
                        }
                    })
                } else {
                    resolve({
                        success: false,
                        message: "Brand with this name already exist",
                        data: null
                    });
                }
            }
        })
    })
}

export function findAllBrands() {
    return new Promise((resolve, reject) => {
        Brand.find({}).populate('category').exec((err, docs) => {
            if (!err) {
                resolve({
                    success: true,
                    message: "Brands fetched successfully",
                    data: docs
                });
            } else {

                resolve({
                    success: false,
                    message: "Can't find Brands",
                    data: null
                });
            }
        });
    });
}

export function findAllBrandsOfCategories(cat_id) {
    return new Promise((resolve, reject) => {
        if (cat_id) {
            Brand.find({ category: cat_id }).populate('category').exec((err, docs) => {
                if (!err) {
                    resolve({
                        success: true,
                        message: "Brands fetched successfully",
                        data: docs
                    });
                } else {

                    resolve({
                        success: false,
                        message: "Can't find Brands",
                        data: null
                    });
                }
            });
        } else {
            resolve({
                success: false,
                message: "Please provide category id to get category brands",
                data: null
            });
        }
    });
}

export function findBrandById(id) {
    return new Promise((resolve, reject) => {
        Brand.findById(id).populate('category').exec((err, docs) => {
            if (!err) {
                resolve({
                    success: true,
                    message: "Brand fetched successfully",
                    data: docs
                });
            } else {

                resolve({
                    success: false,
                    message: "Can't find Brand",
                    data: null
                });
            }
        });
    });
}

export function editBrand(body) {
    return new Promise((resolve, reject) => {
        let id = body._id;
        delete body._id
        Brand.find({ _id: id }).exec((err, docs) => {
            if (docs) {
                if (docs.length == 0) {
                    resolve({
                        success: false,
                        message: "Brand doesn't exist now",
                        data: err
                    });
                } else {
                    Brand.updateOne({ _id: id }, { $set: body }, { new: true },
                        (err, brand) => {
                            if (!err) {

                                resolve({
                                    success: true,
                                    message: "Brand updated successfully",
                                    data: brand
                                });
                            } else {
                                resolve({
                                    success: false,
                                    message: "Unable to update brand",
                                    data: err
                                });
                            }
                        });
                }
            }
        })
    });
}

export function removeBrand(id) {
    return new Promise((resolve, reject) => {
        Brand.findByIdAndRemove({ _id: id },
            (err, brand) => {
                if (!err) {
                    resolve({
                        success: true,
                        message: "Brand removed successfully",
                        data: brand
                    });
                } else {
                    resolve({
                        success: false,
                        message: "Unable to remove brand",
                        data: err
                    });
                }
            });

    });
}