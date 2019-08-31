var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Role = mongoose.model(
  "roles",
  new Schema({
    title : String,
    slug: String,
    createdAt: String,
    updatedAt: String,
    isActive : {type : Boolean, default: true}
  })
);

export async function saveRole(obj) {
  let rol = new Role(obj)
  let role = await rol.save()
  return role
}

export async function findAllRole() {
  let roles = await Role.find({})
  return roles
}

export async function findRoleById(id) {
  let roles = await Role.findById(id).exec()
  return roles
}

export async function editRole(body) {
  let id = body.id
  let rol = await Role.updateOne(
    { _id: id },
    { $set: body })
  return rol
}

export async function findRoleBySlug(slug){
  let rol = await Role.find({slug : slug})
  return rol
}

export async function saveAllRoles(){
  let body = [
    {
      title: "Admin",
      slug: "admin"
    },
    {
      title: "Super Admin",
      slug: "super_admin"
    },
    {
      title: "Store Keeper",
      slug: "store_keeper"
    }
  ]
  
  body.forEach(item=>{
   saveRole(item).then(resp=>{
    console.log(resp)
   })
  })

}