const app = require("express").Router();
const {
  GetAllFood,
  GetFood,
} = require("../../controllers/User/Food.controller");

app.get("/AllFood/:id", GetAllFood);
app.post("/Food/:id", GetFood);

module.exports = app;
