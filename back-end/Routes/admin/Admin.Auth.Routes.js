const app = require("express").Router();
const {
  register,
  updateUser,
  login,
  logout,
} = require("../../controllers/admin/Auth.controller");

app.post("/register", register);
app.post("/login", login);
app.post("/update:id", updateUser);
app.get("/logout", logout);

module.exports = app;