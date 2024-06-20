const User = require("../../modules/Users/User.service");
const bcrypt = require("bcrypt");
let saltrounds = 5;
const {
  createJWT,
  verifyToken,
  attachCookiesToResponse,
} = require("../../Utilities/jwt");
const checkPermissions = require("../../Utilities/permission");
const { SendMail } = require("../../Utilities/emailer");

const register = async (req, res) => {
  try {
    console.log(req.body);
    const random_number = Math.floor(Math.random() * 9000) + 1000;
    req.body.user.rando = random_number;
    const user = await User.create(req.body.user);

    console.log(user);
    if (user.success == false) {
      res.status(user.code).json(user.error);
    } else {
      res.status(user.code).json({ user });
    }
  } catch {
    res.status(500).json({ error: "Unexpected error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body.user;
    console.log(req.body.user);
    if (!email || !password) {
      res.status(400).json({ error: "Please provide email and password" });
    }
    let user = await User.comparePassword(email, password);
    console.log(user);
    if (user.success == true) {
      res.status(user.code).json(user.data);
    } else {
      res.status(user.code).json(user.error);
    }
  } catch {
    res.status(500).json({ error: "Unexpected error" });
  }
};
let sendRandoMail = async (req, res) => {
  try {
    let user = await User.isExist(req.body.user);
    console.log(user);
    var reciever = req.body.user.email;
    var subject = "OTP Code for ";
    var text = "Please Enter the OTP Code below in the Forget password page";
    var html = `<h5> ${user.data.rando}</h5>`;
    await SendMail(reciever, subject, text, html);
    res.status(user.code).json({ email: user.data.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unexpected error" });
  }
};
let checkOTP = async (req, res) => {
  try {
    let data = await User.isExist({ email: req.body.user.email });
    let user = data.data;
    let OTP = req.body.user.OTP;
    const random_number = Math.floor(Math.random() * 9000) + 1000;
    let form = { rando: random_number };
    console.log(user.id);
    if (user.rando == OTP) {
      let success = await User.update(user.id, form);
      console.log(success);
      res.status(success.code).json({
        message: "Success",
        username: success.data.username,
        id: success.data.id,
      });
    } else {
      res.status(400).json({ error: "Wrong OTP" });
    }
  } catch {
    res.status(500).json({ error: "Unexpected error" });
  }
};
let updateUser = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.params);
    let userid = req.params.id;
    let form = req.body.user;
    if (req.body.user.password) {
      form.password = await bcrypt.hash(req.body.user.password, saltrounds);
    }
    let user = await User.update(userid, form);
    console.log(user);
    if (user.success == true) {
      res.status(user.code).json(user.data);
    } else {
      res.status(user.code).json({ error: user.error });
    }
  } catch {
    res.status(500).json({ error: "Unexpected error" });
  }
};

const logout = async (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("token", {
      sameSite: "none",
      secure: true,
    });
  });
  res.status(200).json({ msg: "user logged out!" });
};
module.exports = {
  sendRandoMail,
  logout,
  updateUser,
  login,
  register,
  checkOTP,
};
