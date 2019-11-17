var mongoose = require("mongoose");
var Schema = mongoose.Schema;

export var Product = mongoose.model(
    "product",
    new Schema({
        name: String,
        brand: { type: Schema.Types.ObjectId, ref: "brand" },
        colors: [String],
        sizes: [String],
        description: String,
        thumnbail: String,
        images: [String],
        thumnbnailImage: String,
        price: Number,
        quantity: Number,
        discount: Number,
        category: { type: Schema.Types.ObjectId, ref: "category" },
        createdAt: String,
        updatedAt: String,
        isActive: { type: Boolean, default: true }
    })
);

export function saveProduct(obj) {
    delete obj._id;
    return new Promise((resolve, reject) => {
        Product.find({ name: obj.name, isActive: true }).exec((err, docs) => {
            // console.log(docs, 'docs')
            if (docs) {
                if (docs.length == 0) {
                    Product.find({ colors: obj.color }).exec((err, docs) => {
                        if (docs) {
                            if (docs.length == 0) {
                                Product.find({ sizes: obj.size }).exec((err, sizeDocs) => {
                                    // console.log(sizeDocs, 'size')
                                    if (sizeDocs.length == 0) {
                                        obj.createdAt = Date.now()
                                        obj.updatedAt = Date.now()
                                        var product = new Product(obj)
                                        product.save(function(err, data) {

                                            if (!err) {
                                                resolve({
                                                    success: true,
                                                    message: "Product added Successfully",
                                                    data
                                                });
                                            } else {
                                                resolve({
                                                    success: false,
                                                    message: "Unable to add Product",
                                                    data: err
                                                });
                                            }
                                        })
                                    } else {
                                        resolve({
                                            success: false,
                                            message: "This product with same size already exist",
                                            data: err
                                        });
                                    }
                                })
                            } else {

                                resolve({
                                    success: false,
                                    message: "Product with this color already exist",
                                    data: null
                                });
                            }
                        }
                    })
                } else {

                    resolve({
                        success: false,
                        message: "Product with this name already exist",
                        data: null
                    });
                }
            }
        })
    })
}

export function findAllProducts() {
    return new Promise((resolve, reject) => {
        Product.find({ isActive: true }).populate('category').populate('brand').exec((err, docs) => {
            if (!err) {

                resolve({
                    success: true,
                    message: "Products fetched successfully",
                    data: docs
                });
            } else {

                resolve({
                    success: false,
                    message: "Can't find Products",
                    data: null
                });
            }
        });
    });
}

export function findProductById(id) {
    return new Promise((resolve, reject) => {
        Product.findById(id).populate("category").exec((err, docs) => {
            if (!err) {

                resolve({
                    success: true,
                    message: "Product fetched successfully",
                    data: docs
                });
            } else {

                resolve({
                    success: false,
                    message: "Can't find Product",
                    data: null
                });
            }
        });
    });
}

export function editProduct(body) {
    return new Promise((resolve, reject) => {
        let id = body._id;
        delete body.id
        if (body.name) {
            Product.find({ name: body.name, isActive: true }).exec((err, docs) => {
                console.log(docs, 'in name')
                if (docs) {
                    if (docs.length > 1) {
                        resolve({
                            success: false,
                            message: "Can't Update! Another product with this name already exist",
                            data: null
                        });
                    } else {
                        console.log('in update block')
                        Product.updateOne({ _id: id }, { $set: body }).exec((err, prodUpdate) => {
                            console.log(prodUpdate, 'update')
                            if (prodUpdate) {
                                resolve({
                                    success: true,
                                    message: "Product updated successfully",
                                    data: prodUpdate
                                });
                            } else {
                                resolve({
                                    success: false,
                                    message: "Error in updating product",
                                    data: err
                                });
                            }
                        })
                    }
                } else {
                    resolve({
                        success: false,
                        message: "Product not found",
                        data: err
                    });
                }
            })
        } else {
            resolve({
                success: false,
                message: "Unable to update Product",
                data: err
            });
        }
    });
}

export function removeProduct(id) {
    return new Promise((resolve, reject) => {
        let status = { isActive: false }
        Product.findByIdAndRemove({ _id: id },
            (err, prod) => {
                if (!err) {
                    resolve({
                        success: true,
                        message: "Product removed successfully",
                        data: null
                    });
                } else {
                    resolve({
                        success: false,
                        message: "Unable to remove Product",
                        data: err
                    });
                }
            });

    });
}