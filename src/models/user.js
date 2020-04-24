var mongoose = require("mongoose");
import config from "../conf/index";
const Cryptr = require('cryptr');
import { sign } from "jsonwebtoken";
var Schema = mongoose.Schema;

// secrect key of encryption
const cryptr = new Cryptr('uemployeelocaitonmonitoringsystemu');

var User = mongoose.model(
    "users",
    new Schema({
        name: String,
        email: String,
        password: String,
        mobileNumber: String,
        country: String,
        city: String,
        address: String,
        postalCode: Number,
        nearBy: String,
        isAdmin: { type: Boolean, default: false },
        roleId: { type: Number, default: 0 },
        createdAt: String
    })
);


export async function saveUser(obj) {
    let chk = await User.find({ 'email': obj.email })
    if (chk.length == 0) {
        obj.createdAt = new Date().toLocaleString()
        let userObj = new User(obj)
        let user = await userObj.save()
        return ({ success: true, message: "Congragulations! You have successfully registered", data: user })

    } else {
        return ({ success: false, message: "User already Exist", data: null })
    }
}

export async function findAllUser() {

    let users = await User.find({}).exec()
    return users
}

export async function findUserById(id) {
    let user = await User.findById(id).exec()
    return user
}

export function editUser(body) {
    return new Promise((resolve, reject) => {
        let id = body._id
        delete body._id
        User.find({ _id: id }).exec((err, docs) => {
            if (docs) {
                if (docs.length == 0) {
                    resolve({
                        success: false,
                        message: "User doesn't exist",
                        data: err
                    });
                } else {
                    User.findByIdAndUpdate(id, body, { new: true }, (err, user) => {
                        console.log('err : ', err)
                        console.log('response : ', user)
                        if (!err) {

                            resolve({
                                success: true,
                                message: "User updated successfully",
                                data: user
                            });
                        } else {
                            resolve({
                                success: false,
                                message: "Unable to update user",
                                data: err
                            });
                        }
                    });
                }
            }
        })
    });
}

export async function loginUsers(obj) {
    var expiry
    console.log('in login', obj);
    let details = await User.findOne({ "email": obj.email }).exec()
    if (details) {
        console.log('details --- ', details);
        if (details.password === obj.password) {
            return ({ success: true, message: "login success", data: details })
        } else {
            return ({ success: false, message: "Password incorrect", data: details })
        }
    } else {
        return ({ success: false, message: "Invalid credentials", data: null })
    }
}

export async function forgetPassword(body) {
    let details = await User.findOne({ email: body.email }).exec()
    if (details) {

        let updateObj = await User.updateOne({ _id: details._id }, { $set: { tempToken: token } })
        if (updateObj) {
            return token
        }
    } else {
        return ({ success: false, message: "No User Found", data: null })
    }
}

export async function changePassword(body) {
    let user = await User.findOne({ email: body.token }).exec()
    if (user) {
        let hashVal = cryptr.encrypt(body.password)
        let password = await User.updateOne({ email: body.token }, { $set: { password: hashVal } })
        if (password) {
            return ({ success: true, message: 'Password Updated', data: null })
        }
    } else {
        return ({ success: true, message: 'Can not change password', data: null })
    }
}