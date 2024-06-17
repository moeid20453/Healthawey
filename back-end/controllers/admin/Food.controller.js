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
  GetAllFood,
  GetFood,
  addFoodItem,
};
