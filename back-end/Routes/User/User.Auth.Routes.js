const app = require("express").Router();
const {
  sendRandoMail,
  checkOTP,
  register,
  updateUser,
  login,
  logout,
} = require("../../controllers/User/Auth.controller");

app.post("/register", register);
app.post("/login", login);
app.post("/forgetOTP", sendRandoMail);
app.post("/checkOTP", checkOTP);
app.post("/update:id", updateUser);
app.get("/logout", logout);

module.exports = app;
