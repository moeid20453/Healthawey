import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import "../../assets/MakeMeals.css";

export default function MakeMeals() {
  const [food, setFood] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [mealName, setMealName] = useState("");

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  useEffect(() => {
    calculateTotalWater();
  }, [cartItems]);

  useEffect(() => {
    calculateTotalCal();
  }, [cartItems]);

  useEffect(() => {
    calculateTotalPro();
  }, [cartItems]);

  useEffect(() => {
    calculateTotalLipid();
  }, [cartItems]);

  useEffect(() => {
    calculateTotalAsh();
  }, [cartItems]);

  useEffect(() => {
    calculateTotalCar();
  }, [cartItems]);

  useEffect(() => {
    calculateTotalFiber();
  }, [cartItems]);

  useEffect(() => {
    calculateTotalSugar();
  }, [cartItems]);

  const fetchData = () => {
    fetch(`http://localhost:4500/User/Food/AllFood/${currentPage}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const fetchedFood = data.allFood;
        setFood(fetchedFood);
        setTotalPages(data.totalPages);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleAddToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const calculateTotalWater = () => {
    let totalWater = 0;
    cartItems.forEach((item) => {
      totalWater += item.Water_In_Grams;
    });
    return totalWater.toFixed(2);
  };

  const calculateTotalCal = () => {
    let totalCal = 0;
    cartItems.forEach((item) => {
      totalCal += item.Energy_In_Kilogram_Calorie;
    });
    return totalCal.toFixed(2);
  };

  const calculateTotalPro = () => {
    let totalPro = 0;
    cartItems.forEach((item) => {
      totalPro += item.Protein_In_Grams;
    });
    return totalPro.toFixed(2);
  };

  const calculateTotalLipid = () => {
    let totalLipid = 0;
    cartItems.forEach((item) => {
      totalLipid += item.Lipid_Tot_In_Grams;
    });
    return totalLipid.toFixed(2);
  };

  const calculateTotalAsh = () => {
    let totalAsh = 0;
    cartItems.forEach((item) => {
      totalAsh += item.Ash_In_Grams;
    });
    return totalAsh;
  };

  const calculateTotalCar = () => {
    let totalCar = 0;
    cartItems.forEach((item) => {
      totalCar += item.Carbohydrate_In_Grams;
    });
    return totalCar.toFixed(2);
  };

  const calculateTotalFiber = () => {
    let totalFiber = 0;
    cartItems.forEach((item) => {
      totalFiber += item.Fiber_TD_In_Grams;
    });
    return totalFiber.toFixed(2);
  };

  const calculateTotalSugar = () => {
    let totalSugar = 0;
    cartItems.forEach((item) => {
      totalSugar += item.Sugar_Tot_In_Grams;
    });
    return totalSugar;
  };

  const handleMealNameChange = (event) => {
    setMealName(event.target.value);
  };

  const renderPageNumbers = () => {
    return (
      <div className="pageNumbers">
        <span>
          Page {currentPage} of {totalPages}
        </span>
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

  const showItems = food.map((item, index) => (
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
        <button onClick={() => handleAddToCart(item)}>Add</button>
      </div>
    </div>
  ));

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
          {cartItems.map((item, index) => (
            <li key={index}>
              <div className="itemAdd">
                <div>{item.Short_Description}</div>
                <div>
                  <span>Weight:</span> 100 grams
                </div>
                <div>
                  Calories: <span>{item.Energy_In_Kilogram_Calorie}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="details">
          <div>
            <p>Total Water: {calculateTotalWater()}</p>
          </div>
          <div>
            <p>Total Calories: {calculateTotalCal()}</p>
          </div>
          <div>
            <p>Total Protien: {calculateTotalPro()}</p>
          </div>
          <div>
            <p>Total Carbohydrate: {calculateTotalCar()}</p>
          </div>
        </div>
      </div>
      <div className="foodItem">{showItems}</div>
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {renderPageNumbers()}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
