const User = require("../../modules/Users/User.Model");
const bcrypt = require("bcrypt");
const {
  createJWT,
  verifyToken,
  attachCookiesToResponse,
} = require("../../Utilities/jwt");
const checkPermissions = require("../../Utilities/permission");

const register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    if (user.success == false) {
      res.status(user.code).json(user.error);
    } else {
      const tokenUser = createJWT(user.record._id);
      attachCookiesToResponse({ res, user: tokenUser });
      res.status(user.code).json({ user: tokenUser });
    }
  } catch {
    res.status(500).json({ error: "Unexpected error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Please provide email and password" });
    }
    let user = await bcrypt.comparePassword(email, password);
    if (user.record.success == true) {
      attachCookiesToResponse(res, user.record._id);
      res.status(user.code).json(user.record);
    } else {
      res.status(user.code).json(user.record);
    }
  } catch {
    res.status(500).json({ error: "Unexpected error" });
  }
};
let updateUser = async (req, res) => {
  let userid = req.params.id;
  let form = req.body;
  let user = await User.update(userid, form);
  res
    .status(200)
    .json({ message: "successfully Updated :D new data is ", user });
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
  logout,
  updateUser,
  login,
  register,
};
