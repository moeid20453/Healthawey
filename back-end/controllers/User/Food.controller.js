const Food = require("../../modules/Food/Food.service");

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

const GetAllFood = async (req, res) => {
  try {
    let page = req.params.id;
    let allFood = await Food.getAll(page);
    console.log(allFood);
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
const addMeal = async (req, res) => {
  try {
    let id = req.body.id;
    let meal = req.body.meal;
    let userWmeal = await User.addMeal(id, meal);
    if (userWmeal.success == true) {
      res.status(userWmeal.code).json({ userWmeal: allFood.data });
    } else {
      res.status(userWmeal.code).json({ error: userWmeal.error });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unexpected Error" });
  }
};

module.exports = {
  GetAllFood,
  GetFood,
  addMeal,
};
