var mongoose = require("mongoose");
var Schema = mongoose.Schema;

export var Tracking = mongoose.model(
  "trackings",
  new Schema({
    gateway : String,
    card : String,
    timeIn: String,
    signalStrength: String,
    employeeName : String,
    groupColor : String,
    groupName : String,
    building : String,
    floor : String,
    apartment : String,
    buildingId : {type: Schema.Types.ObjectId, ref: "buildings"},
    floorId: { type: Schema.Types.ObjectId, ref: "floors" },    
    apartmentId: { type: Schema.Types.ObjectId, ref: "apartments" },
    bleId : {type: Schema.Types.ObjectId, ref: "bles"},
    employeeId: { type: Schema.Types.ObjectId, ref: "employees" },
    gatewayId: { type: Schema.Types.ObjectId, ref: "gateways" },
    isActive: { type: Boolean, default: true },
    createdAt: String,
    updatedAt: String,
  })
);

export async function saveTracking(obj) {
  return new Promise((resolve,reject)=>{
  var tracking = new Tracking(obj)
  tracking.save(function (err, docs) {
    if(!err){
      console.log(docs)
      resolve (docs)
    }
    else{
      console.log(err,"error occured while saving tracking data")
    }
  })
  })
}

export async function findAllTracking() {
  let tracking = await Tracking.find().exec()
  return tracking
}

export async function findTrackingById(id) {
  let db = await TrackingModel()
  let track = db.Tracking
  let tracking = await track.findById(id).populate('gatewayId').populate('employeeId').populate('floorId').populate('appartmentId').exec()
  return tracking
}

export async function editTracking(body) {
  let db = await TrackingModel()
  let track = db.Tracking
  let id = body.id
  let tracking = await track.updateOne(
    { _id: id },
    { $set: body })
  return tracking
}

export async function findEmployeeTrackRecord(key, value) {
  let db = await TrackingModel()
  let track = db.Tracking
  var obj = {};
  obj[key] = value;
  let tracking = await track.find(obj)
  return tracking
}