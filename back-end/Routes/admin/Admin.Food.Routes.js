const app = require("express").Router();
const {
  GetAllFood,
  GetFood,
  addFoodItem,
} = require("../../controllers/admin/Food.controller");

app.get("/AllFood/:id", GetAllFood);
app.post("/Food/:id", GetFood);
app.post("/Food/AddFood", addFoodItem);

module.exports = app;
