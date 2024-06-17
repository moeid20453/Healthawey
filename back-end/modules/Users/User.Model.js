const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
let saltrounds = 5;

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
