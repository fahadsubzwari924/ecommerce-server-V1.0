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
        paymentMethod: String,
        createdAt: { type: Date, default: Date.now }
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

export function updateOrderStatus(body) {
    return new Promise((resolve, reject) => {
        const { _id, status } = body;
        delete body._id;
        Order.updateOne({ _id: _id }, { $set: { status: status } }).exec((err, order) => {
            console.log(order, err);
            if (!err) {
                resolve({
                    success: true,
                    message: "Order Status Updated Successfully",
                    data: order
                })
            } else {
                resolve({
                    success: false,
                    message: "Error in updating order status",
                    data: err
                })
            }
        })
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

export function getAllOrders() {
    return new Promise((resolver, reject) => {

        Order.find({}).populate('userId')
            .exec((err, docs) => {
                if (!err) {
                    resolver({
                        success: true,
                        message: "Orders fetched successfully",
                        data: docs
                    });
                } else {
                    resolver({
                        success: true,
                        message: "Can't find orders",
                        data: docs
                    });
                }
            })
    })
}