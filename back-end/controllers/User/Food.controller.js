const Food = require("../../modules/Food/Food.service");
const User = require("../../modules/Users/User.service");

const GetFood = async (req, res) => {
  try {
    let id = req.params.id;
    let Food = await Food.GetSingleFood(id);
    if (Food.success == true) {
      res.status(Food.code).json({ Food: Food.data });
    } else {
      res.status(Food.code).json({ Food: Food.data });
    }
  } catch {
    res.status(500).json({ error: "Unexpected Error while finding Food" });
  }
};

const searchFood = async (req, res) => {
  try {
    let filter = req.body.search;
    let page = req.params.id;
    let food = await Food.isExist(filter, page);
    if (food.success == true) {
      res.status(food.code).json({ food: food.data });
    } else {
      res.status(food.code).json({ food: food.data });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "unexpected error" });
  }
};

const GetAllFood = async (req, res) => {
  try {
    let page = req.params.id;
    let allFood = await Food.getAll(page);
    if (allFood.success == true) {
      res.status(allFood.code).json({ allFood: allFood.data });
    } else {
      res.status(allFood.code).json({ error: allFood.error });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unexpected Error" });
  }
};
const getUserMeals = async (req, res) => {
  try {
    let id = req.params.id;
    let user = await User.get({ _id: id });
    let usermeals = user.data.meals;
    if (user.success == true) {
      res.status(user.code).json({ userMeals: usermeals });
    } else {
      res.status(user.code).json({ user: user.error });
    }
  } catch (error) {
    res.status(500).json({ error: "unexpected error" });
  }
};
const addMeal = async (req, res) => {
  try {
    let id = req.body.id;
    let meal = req.body.meal;
    let userWmeal = await User.addMeal(id, meal);
    if (userWmeal.success == true) {
      res.status(userWmeal.code).json({ userWmeal: userWmeal.data });
    } else {
      res.status(userWmeal.code).json({ error: userWmeal.error });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unexpected Error" });
  }
};
const removeMeal = async (req, res) => {
  try {
    let id = req.body.userid;
    let mealid = req.body.mealid;
    const newuser = await User.removeMeal(id, mealid);
    if (newuser.success == true) {
      res.status(newuser.code).json({ user: newuser.data });
    } else {
      res.status(newuser.code).json({ user: newuser.error });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unexpected Error" });
  }
};

module.exports = {
  searchFood,
  GetAllFood,
  GetFood,
  addMeal,
  getUserMeals,
  removeMeal,
};
