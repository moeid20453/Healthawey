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
    let Food = await Food.getAll();
    if (Food.success == true) {
      res.status(Food.code).json({ Food: Products.data });
    } else {
      res.status(Food.code).json({ error: Food.error });
    }
  } catch {
    res.status(500).json({ error: "Unexpected Error" });
  }
};
const addFoodItem = async (req, res) => {
  try {
    let item = req.body.food;
    let FoodItem = await Food.addFood(item);
    if (FoodItem.success == true) {
      res.status(FoodItem.code).json(FoodItem.error);
    } else {
      res.status(FoodItem.code).json(FoodItem.error);
    }
  } catch (err) {
    res.status(500).json({ error: "Unexpected Error" });
  }
};

module.exports = {
  searchFood,
  GetAllFood,
  GetFood,
  addFoodItem,
};
