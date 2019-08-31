import { parseBody } from "../utilities";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

export var ApiKey = mongoose.model(
  "apikeys",
  new Schema({
    name: String,
    key: String,
    createdAt: String,
    updatedAt: String,
    isActive: { type: Boolean, default: true }
  })
);

export async function saveKey(req, res) {
  let obj = parseBody(req)
  let key = new ApiKey(obj)
  let k = await key.save()
  console.log('key saved')
}

// export async function findAllRole() {
//   let roles = await Role.find({})
//   return roles
// }

// export async function findRoleById(id) {
//   let roles = await Role.findById(id).exec()
//   return roles
// }

// export async function editRole(body) {
//   let id = body.id
//   let rol = await Role.updateOne(
//     { _id: id },
//     { $set: body })
//   return rol
// }



