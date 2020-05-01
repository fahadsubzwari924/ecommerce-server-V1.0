var mongoose = require("mongoose");
var Schema = mongoose.Schema;


export var Order = mongoose.model(
    'order',
    new Schema({

        amount: String,
        status: { type: String, default: 'Pending' },
        date: String,
        products: Array,
        userId: { type: Schema.Types.ObjectId, ref: "users", null: true },
        user: Object,
        paymentMethod: String
    })
);


export function saveOrder(obj) {
    return new Promise((resolve, reject) => {
        var order = new Order(obj)
        order.save(function(err, data) {
            if (!err) {

                resolve({
                    success: true,
                    message: "Order added Successfully",
                    data
                });
            } else {
                console.log(err, data)
                resolve({
                    success: false,
                    message: "Unable to place order",
                    err
                });
            }
        })
    })
}

export function editBanner(body) {

    return new Promise((resolver, reject) => {
        var id = body._id
        delete body._id;
        if (body.heading) {
            Banner.updateOne({ _id: id }, { $set: body }).exec((err, banner) => {
                if (!err) {
                    resolver({
                        success: true,
                        message: "Banner Updated Successfully",
                        data: banner
                    })
                } else {
                    resolver({
                        success: false,
                        message: "Error in updating banner",
                        data: null
                    })
                }
            })

        }
    })

}

export function removeBanner(id) {
    return new Promise((resolver, reject) => {
        let status = { isActive: true }
        Banner.findByIdAndRemove({ _id: id },
            (err, bann) => {
                if (!err) {
                    resolve({
                        success: true,
                        message: "Banner removed successfully",
                        data: null
                    });
                } else {
                    resolve({
                        success: false,
                        message: "Unable to removed Banner",
                        data: err
                    });
                }
            }
        )
    })
}

export function getAllBanners() {
    return new Promise((resolver, reject) => {

        Banner.find({ isActive: true }).populate('category').populate('product').populate('brand')
            .exec((err, docs) => {
                if (!err) {
                    resolver({
                        success: true,
                        message: "Banner fetched successfully",
                        data: docs
                    });
                } else {
                    resolver({
                        success: true,
                        message: "Can't find banners",
                        data: docs
                    });
                }
            })
    })
}