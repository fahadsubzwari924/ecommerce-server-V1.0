var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Category = mongoose.model(
    "category",
    new Schema({
        name: String,
        desc: String,
        icon: String,
        parent: String,
        currentCategoryPath: String,
        displayLabel: String,
        createdAt: String,
        updatedAt: String,
        icon: String,
        isActive: { type: Boolean, default: true }
    })
);

export function saveCategory(obj) {
    return new Promise((resolve, reject) => {
        Category.find({ name: obj.catName, isActive: true }).exec((err, docs) => {
            if (docs) {
                if (docs.length == 0) {
                    obj.createdAt = Date.now()
                    obj.updatedAt = Date.now()
                    var category = new Category(obj)
                    category.save(function(err, data) {
                        if (!err) {
                            resolve({
                                success: true,
                                message: "Category added Successfully",
                                data
                            });
                        } else {
                            resolve({
                                success: false,
                                message: "Unable to add Category",
                                data: err
                            });
                        }
                    })
                } else {

                    resolve({
                        success: false,
                        message: "Category already exist",
                        data: null
                    });
                }
            }
        })
    })

}

export function findAllTotalCategories() {
    return new Promise((resolve, reject) => {
        Category.find({}).exec((err, docs) => {
            if (!err) {
                resolve({
                    success: true,
                    message: "Categories fetched successfully",
                    data: docs
                });
            } else {
                resolve({
                    success: false,
                    message: "Can't find Categories",
                    data: null
                });
            }
        });
    });
}

export function findAllRootCategories() {
    return new Promise((resolve, reject) => {
        Category.find({ parent: '/', isActive: true }).exec((err, docs) => {
            if (!err) {
                resolve({
                    success: true,
                    message: "Categories fetched successfully",
                    data: docs
                });
            } else {
                resolve({
                    success: false,
                    message: "Can't find Categories",
                    data: null
                });
            }
        });
    });
}

export function findAllSubCategories(body) {
    let parentCategoryPath = body.parent
    return new Promise((resolve, reject) => {
        Category.find({ parent: new RegExp(parentCategoryPath), isActive: true }).exec((err, docs) => {
            if (!err) {
                resolve({
                    success: true,
                    message: "Sub categories of category fetched successfully",
                    data: docs
                });
            } else {
                resolve({
                    success: false,
                    message: "Can't find Sub categories",
                    data: null
                });
            }
        });
    });
}

export function findDescendentCategoriesOnly(body) {
    let parentCategoryPath = body.parent
    return new Promise((resolve, reject) => {
        Category.find({ parent: parentCategoryPath, isActive: true }).exec((err, docs) => {
            if (!err) {
                resolve({
                    success: true,
                    message: "Sub categories of category fetched successfully",
                    data: docs
                });
            } else {
                resolve({
                    success: false,
                    message: "Can't find Sub categories",
                    data: null
                });
            }
        });
    });
}
export function findCategoryById(id) {
    return new Promise((resolve, reject) => {
        Category.findById(id).populate('subCategories').exec((err, docs) => {
            if (!err) {
                resolve({
                    success: true,
                    message: "Category fetched successfully",
                    data: docs
                });
            } else {
                resolve({
                    success: false,
                    message: "Can't find Category",
                    data: null
                });
            }
        });
    });
}
export function editCategory(body) {
    return new Promise((resolve, reject) => {
        let id = body._id;
        let newCategoryName = body.name;
        delete body._id;
        Category.findById({ _id: id }).exec((err, docs) => {
            console.log(docs, 'docs')
            if (docs) {
                let oldCategoryName = docs.name;
                Category.updateOne({ _id: id }, { $set: body }, (err, categoryUpdate) => {
                    if (!err) {
                        Category.find({ parent: new RegExp(oldCategoryName, 'g') }).exec((err, editDocs) => {
                            if (editDocs.length > 0) {
                                editDocs.forEach((item, index) => {
                                    let newCurrentPath = item['currentCategoryPath'].replace(oldCategoryName, newCategoryName);
                                    let newParentPath = item['parent'].replace(oldCategoryName, newCategoryName);
                                    let newDisplayLabel = item['displayLabel'].replace(oldCategoryName, newCategoryName);
                                    item['currentCategoryPath'] = newCurrentPath
                                    item['parent'] = newParentPath
                                    item['displayLabel'] = newDisplayLabel
                                    item.save((err, result) => {
                                        if (result) {
                                            resolve({
                                                success: true,
                                                message: "Category and sub categories updated successfully",
                                                data: result
                                            });
                                        } else {
                                            resolve({
                                                success: false,
                                                message: "Error in editing categories and sub categories",
                                                data: err
                                            });
                                        }
                                    })
                                })
                            } else {
                                resolve({
                                    success: true,
                                    message: "Categrory updated sucessfully",
                                });
                            }
                        })
                    } else {
                        resolve({
                            success: false,
                            message: "Error in updating category",
                            data: err
                        });
                    }
                })
            } else {
                resolve({
                    success: false,
                    message: "Category not found",
                    data: err
                });
            }
        })
    })
}
export function removeCategory(id, name) {
    let removeCategoryIds = []
    return new Promise((resolve, reject) => {
        Category.findByIdAndRemove({ _id: id }, (err, link) => {
            if (!err) {
                Category.find({ parent: new RegExp(name, 'g') }).exec((error, docs) => {
                    if (docs.length > 0) {
                        docs.forEach(item => {
                            removeCategoryIds.push(item._id)
                        })
                        console.log(removeCategoryIds, 'removeIds')
                        if (removeCategoryIds.length > 0) {
                            Category.deleteMany({ _id: removeCategoryIds }).exec((err, deleteManyResult) => {
                                if (deleteManyResult) {
                                    resolve({
                                        success: true,
                                        message: "Category and related sub categories removed successfully",
                                        data: null
                                    })
                                } else {
                                    resolve({
                                        success: false,
                                        message: "Deleted category but error in deleting sub categories",
                                        data: err
                                    })
                                }
                            })
                        }
                    } else {
                        resolve({
                            success: false,
                            message: "Deleted category, and no sub categories found to delete",
                            data: error
                        })
                    }
                })
            } else {
                resolve({
                    success: false,
                    message: "Unable to remove category",
                    data: err
                });
            }
        });
    });
}
export function getAllFloorsOfBuilding(id) {
    return new Promise((resolve, reject) => {
        Floor.find({ buildingId: id, isActive: true }).exec((err, docs) => {
            if (!err) {
                resolve({
                    success: true,
                    message: "Floor fetched successfully",
                    data: docs
                });
            } else {
                resolve({
                    success: false,
                    message: "Can't find Floor",
                    data: null
                });
            }
        });
    });
}