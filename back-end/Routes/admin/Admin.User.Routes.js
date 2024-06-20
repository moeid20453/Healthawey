const app = require("express").Router();

const {
  getAllUsers,
  getUser,
  deleteUser,
} = require("../../controllers/admin/User.Controller");

app.post("/user", getUser);
app.get("/AllUsers", getAllUsers);
app.delete("/delete/user/:id", deleteUser);

module.exports = app;
