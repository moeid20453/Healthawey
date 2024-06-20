const User = require("../../modules/Users/User.service");

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    let deletedUser = await User.remove(id);
    if (deletedUser.success == true) {
      res.status(deletedUser.code).json(deletedUser.data);
    } else {
      res.status(deletedUser.code).json(deletedUser.error);
    }
  } catch {
    res.status(500).json({ error: "Unexpected error" });
  }
};

const getUser = async (req, res) => {
  try {
    let id = req.body.id;
    let user = await User.get({ _id: id });
    if (user.success == true) {
      res.status(user.code).json(user.data);
    } else {
      res.status(user.code).json(user.error);
    }
  } catch {
    res.status(500).json({ error: "Unexpected error in the admin controller" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    let role = "user";
    let list = await User.list({ role: role });
    if (list.success == true) {
      res.status(list.code).json({ user: list.data });
    } else {
      res.status(list.code).json({ error: list.error });
    }
  } catch {
    console.log("Unexpected Error");
    res.status(500).json({ error: "Unexpected Error" });
  }
};

module.exports = {
  getAllUsers,
  getUser,
  deleteUser,
};
