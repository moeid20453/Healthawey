let User = require("./User.Model");
let bcrypt = require("bcrypt");

exports.isExist = async (filter) => {
  try {
    const user = await User.findOne(filter);
    console.log(filter);
    if (user) {
      return {
        success: true,
        data: user,
        code: 200,
      };
    } else {
      return {
        success: false,
        err: "User not found",
        code: 404,
      };
    }
  } catch (err) {
    console.log("Error", err.message);
    return {
      success: false,
      code: 500,
      error: "Unexpected Error",
    };
  }
};
exports.get = async (filter) => {
  try {
    let data = await User.findOne(filter).select("-password");
    if (data) {
      return {
        success: true,
        data: data,
        code: 200,
      };
    } else {
      return {
        success: false,
        code: 404,
        error: "User not found",
      };
    }
  } catch (err) {
    return {
      success: false,
      code: 500,
      error: "Unexpected Error!",
    };
  }
};

exports.list = async (filter) => {
  try {
    let users = await User.find(filter).select("-password");
    return {
      success: true,
      data: users,
      code: 200,
    };
  } catch (err) {
    console.log("error message", err.message);
    return {
      success: false,
      code: 500,
      error: "Unexpected error",
    };
  }
};
exports.create = async (filter) => {
  try {
    console.log(filter);
    if (filter.email) filter.email = filter.email.toLowerCase();

    let user = await this.isExist({ email: filter.email });
    if (!user.success) {
      const newUser = new User(filter);
      await newUser.save();
      return {
        success: true,
        data: newUser,
        code: 201,
      };
    } else {
      return {
        success: false,
        error: "User already Exists",
        code: 409,
      };
    }
  } catch (err) {
    console.log("error message", err.message);
    return {
      success: false,
      code: 500,
      error: "Unexpected Error !",
    };
  }
};
exports.update = async (_id, form) => {
  try {
    const user = await this.isExist({ _id });
    if (user.success == true) {
      await User.findByIdAndUpdate({ _id }, form);
      let userUpdate = await this.isExist({ _id });
      console.log(userUpdate);
      return {
        success: true,
        data: userUpdate.data,
        code: 201,
      };
    } else {
      return {
        success: false,
        error: user.error,
        code: 404,
      };
    }
  } catch (err) {
    console.log("Error", err.message);
    return {
      success: false,
      code: 500,
      error: "Unexpected Error",
    };
  }
};

exports.remove = async (id) => {
  try {
    const user = await this.isExist({ _id: id });
    if (user.success) {
      if (user.data.role == "user") {
        await User.findByIdAndDelete({ id });

        return {
          success: true,
          data: user,
          code: 200,
        };
      } else {
        await User.findByIdAndDelete({ id });
        return {
          success: true,
          data: user,
          code: 200,
        };
      }
    } else {
      return {
        success: false,
        error: "This user Doesn't exist",
        code: 405,
      };
    }
  } catch (err) {
    console.log("Error", err.message);
    return {
      success: false,
      code: 500,
      error: "Unexpected Error",
    };
  }
};
exports.addMeal = async (id, meal) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $push: { meals: meal } },
      { new: true }
    );
    return {
      success: true,
      data: updatedUser,
      code: 201,
    };
  } catch {
    return {
      success: false,
      code: 500,
      error: "Unexpected Error",
    };
  }
};
exports.removeMeal = async (userid, mealid) => {
  try {
    const user = await User.findByIdAndUpdate(
      { _id: userid },
      { $pull: { meals: { _id: mealid } } }
    );

    return {
      success: true,
      data: user,
      code: 201,
    };
  } catch (error) {
    return {
      success: false,
      code: 500,
      error: "Unexpected Error",
    };
  }
};
exports.comparePassword = async (email, password) => {
  try {
    email = email.toLowerCase();
    let user = await this.isExist({ email });
    console.log(user);
    if (user.success) {
      let match = await bcrypt.compare(password, user.data.password);
      console.log(match);
      if (match) {
        return {
          success: true,
          data: user.data,
          code: 200,
        };
      } else {
        return {
          success: false,
          code: 409,
          error: "Incorrect Password",
        };
      }
    } else {
      return {
        success: false,
        code: 404,
        error: user.error,
      };
    }
  } catch (err) {
    console.log("Error", err.message);
    return {
      success: false,
      code: 500,
      error: "Unexpected Error",
    };
  }
};

exports.resetPassword = async (email, newPassword) => {
  try {
    email = email.toLowerCase();
    let user = await this.isExist({ email });
    let saltrounds = 5;
    if (user.success) {
      let hashedpassword = await bcrypt.hash(newPassword, saltrounds);
      await User.findOneAndUpdate({ email }, { password: hashedpassword });
      return {
        success: true,
        code: 200,
      };
    } else
      return {
        success: false,
        code: 404,
        error: user.error,
      };
  } catch (err) {
    console.log("Error", err.message);
    return {
      success: false,
      code: 500,
      error: "Unexpected Error",
    };
  }
};
