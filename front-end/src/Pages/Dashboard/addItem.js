import React, { useState } from "react";
import axios from "axios";
import "../../assets//addItem.css";

const NutritionForm = () => {

  const [name, setName] = useState("");
  const [water, setwater] = useState("");
  const [calories, setcalories] = useState("");
  const [protein, setprotein] = useState("");
  const [lipid, setlipid] = useState("");
  const [ash, setash] = useState("");
  const [carbohydrate, setcarbohydrate] = useState("");
  const [fiber, setfiber] = useState("");
  const [sugar, setsugar] = useState("");
  const [accept, setAccept] = useState(false);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    let flag = true;
    e.preventDefault();
    setAccept(true);
    setLoading(true);
    if (
      name === "" ||
      water === "" ||
      calories === "" ||
      protein === "" ||
      lipid === "" ||
      ash === "" ||
      carbohydrate === "" ||
      fiber === "" ||
      sugar === ""
    ) {
      flag = false;
    } else flag = true;
    try {
      if (flag) {
        let res = await axios.post("http://localhost:4500/Admin/AddFood", {
          food: {
            Short_Description: name,
            Water_In_Grams: water,
            Energy_In_Kilogram_Calorie: calories,
            Protein_In_Grams: protein,
            Lipid_Tot_In_Grams: lipid,
            Ash_In_Grams: ash,
            Carbohydrate_In_Grams: carbohydrate,
            Fiber_TD_In_Grams: fiber,
            Sugar_Tot_In_Grams: sugar,
          },
        });
        setLoading(false);
       
      }
    } catch (err) {
      if (err.response.status === 409) {
        setErr("error");
      } else {
        setErr("Error2");
      }
      setLoading(false);
    }
  }

  return (
    <div className="bodyAddItem">
      <div className="dashboard">
        <h1>Add Item Form</h1>
        <form onSubmit={submit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Water:</label>
            <input
              type="int"
              name="water"
              value={water}
              onChange={(e) => setwater(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Calories:</label>
            <input
              type="int"
              name="calories"
              value={calories}
              onChange={(e) => setcalories(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Protein:</label>
            <input
              type="int"
              name="protein"
              value={protein}
              onChange={(e) => setprotein(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Lipid:</label>
            <input
              type="int"
              name="lipid"
              value={lipid}
              onChange={(e) => setlipid(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Ash:</label>
            <input
              type="int"
              name="ash"
              value={ash}
              onChange={(e) => setash(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Carbohydrate:</label>
            <input
              type="int"
              name="carbohydrate"
              value={carbohydrate}
              onChange={(e) => setcarbohydrate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Fiber:</label>
            <input
              type="int"
              name="fiber"
              value={fiber}
              onChange={(e) => setfiber(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Sugar:</label>
            <input
              type="int"
              name="sugar"
              value={sugar}
              onChange={(e) => setsugar(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <button type="submit">Add Item</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NutritionForm;
