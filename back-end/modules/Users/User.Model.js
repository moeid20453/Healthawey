const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
let saltrounds = 5;
const mealSchema = mongoose.Schema({
  name: { type: String, required: true },
  items: [{ type: Array }],
  totalWater: { type: Number },
  totalCal: { type: Number },
  totalPro: { type: Number },
  totalLipid: { type: Number },
  totalAsh: { type: Number },
  totalCar: { type: Number },
  totalFiber: { type: Number },
  totalSugar: { type: Number },
  favorite: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

let UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide a Valid Name"],
    minlength: 3,
    maxlength: 20,
  },
  username: {
    type: String,
    required: [true, "please provide a UserName"],
    minlength: 3,
    maxlength: 20,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please provide email"],
  },
  height: {
    type: Number,
  },
  weight: {
    type: Number,
  },
  age: {
    type: Number,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
  activity: {
    type: String,
    default: "Moderate Exercise or sports (4-5 days/week)",
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
    default: "Male",
  },
  role: {
    type: String,
    enum: ["admin", "user", "superAdmin"],
    default: "user",
  },
  rando: {
    type: Number,
  },
  meals: [mealSchema],
});
UserSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, saltrounds);
  next();
});
UserSchema.post("save", async function () {
  console.log(this._id);
});
let UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
