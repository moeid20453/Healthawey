const app = require("express").Router();
const {
  GetAllFood,
  GetFood,
  addMeal,
  getUserMeals,
} = require("../../controllers/User/Food.controller");

app.get("/AllFood/:id", GetAllFood);
app.post("/:id", GetFood);
app.post("/AddMeal", addMeal);
app.post("/UserMeals", getUserMeals);

module.exports = app;
