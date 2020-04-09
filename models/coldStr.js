//USER DATA SCHEMA IN MONGOOSE
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cold = new Schema({
  dpdet: {
    name: { type: String, default: "imagenotfound.png" },
    mimetype: String,
  },
  firstName: { type: String, required: true, max: 25 },
  lastName: { type: String, required: true, max: 25 },
  email: { type: String, lowercase: true },
  compName: String, //Company Name
  compId: String,
  compUrl: String,
  password: { type: String, required: true },
  dob: Date,
  gender: { type: String, enum: ["Male", "Female"] },
  //doj: { type: Date, default: Date.now },
  mobile: { type: Number, min: 1111111111, max: 9999999999 },
  isVerified: { type: Boolean, default: false },
  usedDemo: { type: Boolean, default: false },
  otp: String,
  botOwned:{type: Number , default: 0},
  amtPaid: { type: Number, default: 0 }, //Amt Paid Till Date
  //cardDet: {},
  //lastUpi: {}, //regex for upi ([\w.-]*[@][\w]*)
});

module.exports = mongoose.model("cold", cold);
