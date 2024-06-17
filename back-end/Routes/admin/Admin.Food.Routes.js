const app = require("express").Router();
const {
  GetAllFood,
  GetFood
} = require("../../controllers/admin/Food.controller");

app.post("/AllFood", GetAllFood);
app.post("/Food/:id", GetFood);


module.exports = app;