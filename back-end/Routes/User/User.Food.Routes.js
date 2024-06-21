const app = require("express").Router();
const {
  GetAllFood,
  GetFood,
  addMeal,
  getUserMeals,
  searchFood,
  removeMeal,
} = require("../../controllers/User/Food.controller");

app.get("/AllFood/:id", GetAllFood);
app.post("/:id", GetFood);
app.post("/Meal/AddMeal", addMeal);
app.post("/Meal/Remove/:id", removeMeal);
app.get("/UserMeals/:id", getUserMeals);
app.post("/searchFood/:id", searchFood);

module.exports = app;
