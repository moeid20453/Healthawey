const Food = require("./Food.Model");

exports.isExist = async (filter, page) => {
  try {
    let limit = 20;
    const skip = (page - 1) * limit;
    const resault = await Food.find({ $text: { $search: filter } })
      .skip(skip)
      .limit(limit);
    if (resault) {
      return {
        success: true,
        data: resault,
        code: 200,
      };
    } else {
      return {
        success: false,
        err: "Food not found",
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
exports.GetSingleFood = async (filter) => {
  try {
    let data = await Food.findOne(filter);
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
        error: "Food not found",
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
exports.getAll = async (page) => {
  try {
    let limit = 20;
    const skip = (page - 1) * limit;
    const allFood = await Food.find({}).skip(skip).limit(limit);
    return {
      success: true,
      code: 200,
      data: allFood,
    };
  } catch {
    return {
      success: false,
      code: 500,
      error: "Unexpected Error",
    };
  }
};
exports.addFood = async (form) => {
  try {
    const newItem = new Food(form);
    await newItem.save();
    return {
      success: true,
      data: newItem,
      code: 201,
    };
  } catch (err) {
    console.log("error message", err.message);
    return {
      success: false,
      code: 500,
      error: "Unexpected Error !",
    };
  }
};
