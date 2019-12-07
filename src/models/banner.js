var mongoose = require("mongoose");
var Schema = mongoose.Schema;


export var Banner = mongoose.model(
    'banner',
    new Schema({
        heading: String,
        subHeading: String,
        bannerImage: String,
        product:{ type: Schema.Types.ObjectId, ref: "product" },
        category: { type: Schema.Types.ObjectId, ref: "category" },
        brand: { type: Schema.Types.ObjectId, ref: "brand" },
        createdAt: String,
        updatedAt: String,
        isActive: { type: Boolean, default: true }
    })
); 


export function saveBanner(obj) {
    return new Promise((resolver, reject) => {
        var banner = new Banner(obj)
        banner.save(function(err, data) {
            if (!err) {
                resolver({
                    success: true,
                    message: "Banner added Successfully",
                    data
                });
            } else {
                resolver({
                    success: false,
                    message: "Unable to add Banner",
                    data
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
            Banner.updateOne({_id: id}, {$set: body}).exec((err, banner) => {
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
        Banner.findByIdAndRemove({ _id: id}, 
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

        Banner.find({isActive: true}).populate('category').populate('product').populate('brand')
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
