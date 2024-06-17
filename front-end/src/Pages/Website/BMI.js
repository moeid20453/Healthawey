import Header from "../../components/Header"
import '../../assets/BMI.css';
import { useState } from "react";
export default function BMI() {
    const bmiText = document.getElementById("bmi");
    const descText = document.getElementById("desc");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");

function onSubmit(e) {
  e.preventDefault();


  if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
    alert("Please enter a valid weight and height");
    return;
  }

  const heightInMeters = height / 100; // cm -> m
  const bmi = weight / Math.pow(heightInMeters, 2);
  const desc = interpretBMI(bmi);

  bmiText.textContent = bmi.toFixed(2);
  bmiText.className = desc;
  descText.innerHTML = `You are <strong>${desc}</strong>`;
}

function interpretBMI(bmi) {
  if (bmi < 18.5) {
    return "UNDERWEIGHT";
  } else if (bmi < 25) {
    return "NORMAL";
  } else if (bmi < 30) {
    return "OVERWEIGHT";
  } else {
    return "OBESE";
  }
}
    return (
        <div>
        <Header/>
        <div className="container2">
        <h1>BMI Calculator</h1>
    
        <form className="calculator">
          <div>
            <label className="weight" htmlFor="weight">Weight (kg)</label>
                        <input type="number" min="0" step="0.01" value={weight} onChange={(e) => setWeight(e.target.value)} />
          </div>
    
          <div>
            <label className="height" htmlFor="height">Height (cm)</label>
            <input type="number"  min="0" step="0.01" value={height} onChange={(e) => setHeight(e.target.value)} />
          </div>
    
          <div>
            <button type="submit" onClick={onSubmit} >Submit</button>
          </div>
        </form>
    
        <section className="output">
          <h3>Your BMI is</h3>
          <p id="bmi"></p>
          <p id="desc">NAN</p>
        </section>
    
        <section className="bmi-scale">
          <div className="Underweight">
            <h4>Underweight</h4>
            <p>&lt; 18.5</p>
          </div>
    
          <div className="Normal">
            <h4>Normal</h4>
            <p>18.5 – 25</p>
          </div>
    
          <div className="Overweight">
            <h4>Overweight</h4>
            <p>25 – 30</p>
          </div>
    
          <div className="Obese">
            <h4>Obese</h4>
            <p>≥ 30</p>
          </div>
        </section>
      </div>
</div>
    )
}