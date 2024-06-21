import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import axios from "axios";
import Cookies from "js-cookie";
import "../../assets/MakeMeals.css";

const idUser = Cookies.get("id");

export default function MakeMeals() {
  const [food, setFood] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [mealItems, setMealItems] = useState([]);
  const [mealName, setMealName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    fetchData();
  }, [currentPage, isSearching]);

  const fetchData = () => {
    let apiUrl = `http://localhost:4500/User/Food/AllFood/${currentPage}`;
    if (isSearching) {
      apiUrl = `http://localhost:4500/User/Food/searchFood/${currentPage}`;
      axios
        .post(apiUrl, { search: { searchTerm } })
        .then((response) => {
          setSearchResults(response.data.food);
          setTotalPages(response.data.totalPages);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setFood(data.allFood);
          setTotalPages(data.totalPages);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleAddToMeal = (item) => {
    setMealItems([...mealItems, item]);
  };

  const handleRemoveFromMeal = (index) => {
    const updatedItems = [...mealItems];
    updatedItems.splice(index, 1);
    setMealItems(updatedItems);
  };

  const calculateTotal = (key) => {
    const total = mealItems.reduce((total, item) => {
      return total + (item[key] || 0);
    }, 0);

    return Number(total).toFixed(2);
  };

  const handleSaveMeal = async () => {
    const totalWater = calculateTotal("Water_In_Grams");
    const totalCal = calculateTotal("Energy_In_Kilogram_Calorie");
    const totalPro = calculateTotal("Protein_In_Grams");
    const totalLipid = calculateTotal("Lipid_Tot_In_Grams");
    const totalCar = calculateTotal("Carbohydrate_In_Grams");
    const totalFiber = calculateTotal("Fiber_TD_In_Grams");
    const totalSugar = calculateTotal("Sugar_Tot_In_Grams");

    try {
      const response = await axios.post(
        "http://localhost:4500/User/Food/Meal/AddMeal",
        {
          id: idUser,
          meal: {
            name: mealName,
            items: mealItems,
            totalWater: totalWater,
            totalCal: totalCal,
            totalPro: totalPro,
            totalLipid: totalLipid,
            totalCar: totalCar,
            totalFiber: totalFiber,
            totalSugar: totalSugar,
          },
        }
      );
      console.log("Meal saved successfully:", response.data);
      setMealItems([]);
      setMealName("");
      alert("Meal saved successfully!");
    } catch (error) {
      console.error("Error saving meal:", error);
      alert("Error saving meal. Please try again.");
    }
  };

  const handleSearch = async () => {
    setIsSearching(true);
    setCurrentPage(1); // Reset page number to 1 when starting a new search
    try {
      const response = await axios.post(
        `http://localhost:4500/User/Food/searchFood/${currentPage}`, // Always start search from page 1
        {
          search: {
            searchTerm,
          },
        }
      );
      setSearchResults(response.data.food);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("There was an error with the search!", error);
    }
  };

  const handleMealNameChange = (event) => {
    setMealName(event.target.value);
  };

  const renderPageNumbers = () => {
    return (
      <div className="pageNumbers">
        <span>Page {currentPage}</span>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={currentPage === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}
      </div>
    );
  };

  const showItems = (items) => {
    if (items.length === 0) {
      return <p>No items found.</p>;
    }
    return items.map((item, index) => (
      <div className="item" key={index}>
        <div className="name">{item.Short_Description}</div>
        <div className="details">
          <div>
            Water: <span>{item.Water_In_Grams}</span>
          </div>
          <div>
            Calories: <span>{item.Energy_In_Kilogram_Calorie}</span>
          </div>
          <div>
            Protein: <span>{item.Protein_In_Grams}</span>
          </div>
          <div>
            Lipid: <span>{item.Lipid_Tot_In_Grams}</span>
          </div>
          <div>
            Ash: <span>{item.Ash_In_Grams}</span>
          </div>
          <div>
            Carbohydrate: <span>{item.Carbohydrate_In_Grams}</span>
          </div>
          <div>
            Fiber: <span>{item.Fiber_TD_In_Grams}</span>
          </div>
          <div>
            Sugar: <span>{item.Sugar_Tot_In_Grams}</span>
          </div>
        </div>
        <div className="itemWeight">
          <span>Weight:</span> 100 grams
        </div>
        <div className="btnAdd">
          <button onClick={() => handleAddToMeal(item)}>Add</button>
        </div>
      </div>
    ));
  };

  return (
    <div className="bodyFood">
      <Header />
      <div className="cart">
        <h2>Meal</h2>
        <input
          type="text"
          placeholder="Enter Meal Name"
          value={mealName}
          onChange={handleMealNameChange}
          className="mealNameInput"
        />
        <ul>
          {mealItems.map((item, index) => (
            <li key={index}>
              <div className="itemAdd">
                <div>{item.Short_Description}</div>
                <div>
                  <span>Weight:</span> 100 grams
                </div>
                <div>
                  Calories: <span>{item.Energy_In_Kilogram_Calorie}</span>
                </div>
                <div className="btnDelete">
                  <button onClick={() => handleRemoveFromMeal(index)}>
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="details">
          <div>
            <p>Total Water: {calculateTotal("Water_In_Grams")}</p>
          </div>
          <div>
            <p>
              Total Calories: {calculateTotal("Energy_In_Kilogram_Calorie")}
            </p>
          </div>
          <div>
            <p>Total Protein: {calculateTotal("Protein_In_Grams")}</p>
          </div>
          <div>
            <p>Total Carbohydrate: {calculateTotal("Carbohydrate_In_Grams")}</p>
          </div>
        </div>
        <button onClick={handleSaveMeal} className="btnSave">
          Save Meal
        </button>
      </div>
      <input
        className="searchInput"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      <button className="searchButton" onClick={handleSearch}>
        Search
      </button>
      <div className="foodItem">
        {isSearching ? showItems(searchResults) : showItems(food)}
      </div>
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={currentPage === 1 ? "disabled" : ""}
        >
          Prev
        </button>
        {renderPageNumbers()}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={
            currentPage === totalPages ||
            (isSearching ? searchResults.length === 0 : food.length === 0)
          }
          className={
            currentPage === totalPages ||
            (isSearching ? searchResults.length === 0 : food.length === 0)
              ? "disabled"
              : ""
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}
