import '../../assets/BMR.css';
import Header from "../../components/Header"
import { useState } from 'react';
export default function BMR() {
    const bmrText = document.getElementById("bmr");
    const [weight,setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [age,setAge] = useState("");
    

function onSubmit(e) {
  e.preventDefault();


  if (isNaN(weight) || isNaN(height) || isNaN(age) || age<=0 || weight <= 0 || height <= 0) {
    alert("Please enter a valid weight and height");
    return;
  }

  const bmrValue = 10*weight+6.25*height-5*age;
   interpretBMR(bmrValue);

 }

function interpretBMR(bmrValue) {
    let gender=document.getElementById("gender").value
    let Activity=document.getElementById("Activity").value
if(gender==="male"){
    bmrValue= bmrValue+5

    if(Activity==="Sedentary"){
        bmrValue= bmrValue*1.2
    }
    else if(Activity==="Lightly Active"){
        bmrValue= bmrValue*1.375
    }
    else if(Activity==="Moderately Active"){
        bmrValue= bmrValue*1.55
    }
    else if(Activity==="Very Active"){
        bmrValue= bmrValue*1.725
    }
    else if(Activity==="Super Active"){
        bmrValue= bmrValue*1.9
    }
}
else if(gender==="female"){
    bmrValue = bmrValue-161

    if(Activity==="Sedentary"){
        bmrValue= bmrValue*1.2
    }
    else if(Activity==="Lightly Active"){
        bmrValue= bmrValue*1.375
    }
    else if(Activity==="Moderately Active"){
        bmrValue= bmrValue*1.55
    }
    else if(Activity==="Very Active"){
        bmrValue= bmrValue*1.725
    }
    else if(Activity==="Super Active"){
        bmrValue= bmrValue*1.9
    }
}
return  bmrText.textContent = parseInt(bmrValue);
}
    return (
      <div>
        <Header />
        <div className="container2">
          <h1>BMR Calculator</h1>

          <form className="calculator">
            <div>
              <label htmlFor="weight">Weight (kg)</label>
              <input
                type="number"
                id="weight"
                min="0"
                step="0.01"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="height">Height (cm)</label>
              <input
                type="number"
                id="height"
                min="0"
                step="0.01"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="age">Age</label>
              <input
                type="number"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="gender">Gender</label>
              <select className="select2" id="gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div>
              <label htmlFor="gender">Activity</label>
              <select className="select2" id="Activity">
                <option value="Sedentary">Little to no exercise</option>
                <option value="Lightly Active">
                  Light exercise or sports (1-3 days/week)
                </option>
                <option value="Moderately Active">
                  Moderate exercise or sports (4-5 days/week)
                </option>
                <option value="Very Active">
                  Hard exercise or sports (6-7 days/week)
                </option>
                <option value="Super Active">
                  Very hard exercise, physical job, or training twice a day
                </option>
              </select>
            </div>

            <div>
              <button type="submit" onClick={onSubmit}>
                Submit
              </button>
            </div>
          </form>

          <section className="output">
            <h3>Your BMR is</h3>
            <p id="bmr"></p>
            <p>kcal/day</p>
          </section>
        </div>
      </div>
    );
}