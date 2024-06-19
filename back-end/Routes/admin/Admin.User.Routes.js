const app = require("express").Router();

const {
  getAllUsers,
  getUser,
  deleteUser,
} = require("../../controllers/admin/User.Controller");

app.post("/user", getUser);
app.post("/AllUsers", getAllUsers);
app.delete("/delete/user", deleteUser);

module.exports = app;
