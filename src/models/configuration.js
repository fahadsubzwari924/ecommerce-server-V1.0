var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Configuration = mongoose.model(
  "configurations",
  new Schema({
    scanTime: String,
    cloudTime: String,
    intervalTime : String,
    createdAt: String,
    updatedAt: String,
    isActive: { type: Boolean, default: true }
  })
);

export async function saveConfiguration(obj) {
  try {
    let conf = new Configuration(obj)
    let configuration = await conf.save()
    return configuration
  } catch (err) {
    console.log(err)
    return null
  }
}

export async function findConfiguration() {
  try {
    let configuration = await Configuration.find().exec()
    if (configuration) {
      return configuration[0]
    }
    else {
      return null
    }
  } catch (err) {
    console.log(err)
    return null
  }
}

export async function editConfiguration(body) {
  try {
    let id = body.id
    let configuration = await Configuration.updateOne(
      { _id: id },
      { $set: body })
    return configuration
  } catch (err) {
    console.log(err)
    return null
  }
}