import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "../../assets/savedMeals.css"; // Import your CSS file for styling

const SavedMeals = () => {
  const idUser = Cookies.get("id");
  const [userMeals, setUserMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4500/User/Food/UserMeals/${idUser}`
        );

        if (response.data && response.data.userMeals) {
          setUserMeals(response.data.userMeals); // Set userMeals array
        } else {
          setUserMeals([]); // Handle case where userMeals is not present or empty
        }

        setLoading(false); // Update loading state
      } catch (error) {
        console.error("Error fetching meals:", error);
        setError(error); // Set error state
        setLoading(false); // Ensure loading state is updated on error
      }
    };

    if (idUser) {
      fetchMeals();
    }
  }, [idUser]);

  const handleDeleteMeal = async (mealId) => {
    try {
      const response = await axios.post(
        `http://localhost:4500/User/Food/Meal/Remove/${mealId}`,
        {
           userid: idUser ,
        }
      );

      if (response.status === 201) {
        // Remove the deleted meal from the userMeals state
        setUserMeals(userMeals.filter((meal) => meal._id !== mealId));
      } else {
        throw new Error("Failed to delete meal");
      }
    } catch (error) {
      console.error("Error deleting meal:", error);
      // Optionally, set an error state here to show an error message
    }
  };

  const renderMeals = () => {
    if (loading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p>Error fetching meals: {error.message}</p>;
    }

    if (userMeals.length === 0) {
      return <p>No meals found</p>;
    }

    return (
      <div>
        {userMeals.map((meal, index) => (
          <div key={index} className="mealItem">
            <h3>{meal.name}</h3>
            <p>Created At: {new Date(meal.createdAt).toLocaleString()}</p>
            <ul>
              {meal.items &&
              Array.isArray(meal.items) &&
              meal.items.length > 0 ? (
                meal.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="mealDetailItem">
                    <h4>{item.Short_Description}</h4>
                    <div>Calories: {item.Energy_In_Kilogram_Calorie} kcal</div>
                    <div>Weight: 100 g</div>
                  </li>
                ))
              ) : (
                <li className="mealDetailItem">
                  No items found for this meal.
                </li>
              )}
            </ul>
            <div className="mealTotal">
              <p>Total Water: {meal.totalWater}g</p>
              <p>Total Calories: {meal.totalCal} kcal</p>
              <p>Total Protein: {meal.totalPro}g</p>
              <p>Total Lipid: {meal.totalLipid}g</p>
              <p>Total Carbohydrate: {meal.totalCar}g</p>
              <p>Total Sugar: {meal.totalSugar}g</p>
              <p>Total Fiber: {meal.totalFiber}g</p>
            </div>
            <button onClick={() => handleDeleteMeal(meal._id)}>Delete</button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="favouriteMealsPage">
      <div className="mealsBody">
        <div className="mealsContainer">
          <h2>Saved Meals</h2>
          {renderMeals()}
        </div>
      </div>
    </div>
  );
};

export default SavedMeals;
