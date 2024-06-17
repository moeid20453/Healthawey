const app = require("express").Router();
const {
  GetAllFood,
  GetFood,
  addMeal,
} = require("../../controllers/User/Food.controller");

app.get("/AllFood/:id", GetAllFood);
app.post("/:id", GetFood);
app.post("/AddMeal", addMeal);

module.exports = app;
