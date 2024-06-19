const mongoose = require("mongoose");

let FoodSchema = mongoose.Schema({
  Ash_In_Grams: {
    type: String,
  },
  Carbohydrate_In_Grams: {
    type: Number,
  },
  Energy_In_Kilogram_Calorie: {
    type: Number,
  },
  Fiber_TD_In_Grams: {
    type: Number,
  },
  Lipid_Tot_In_Grams: {
    type: Number,
  },
  NDB_No: {
    type: Number,
  },
  Protein_In_Grams: {
    type: Number,
  },
  Short_Description: {
    type: String,
  },
  Sugar_Tot_In_Grams: {
    type: Number,
  },
  Water_In_Grams: {
    type: Number,
  },
});
FoodSchema.index({ Short_Description: "text" });

let FoodModel = mongoose.model("Food", FoodSchema);

module.exports = FoodModel;
