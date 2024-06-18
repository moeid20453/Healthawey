const app = require("express").Router();
const {
  GetAllFood,
  GetFood,
  addFoodItem,
  searchFood,
} = require("../../controllers/admin/Food.controller");

app.get("/AllFood/:id", GetAllFood);
app.post("/Food/:id", GetFood);
app.post("/AddFood", addFoodItem);
app.post("/searchFood/:id", searchFood);

module.exports = app;
