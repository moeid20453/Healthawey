import Cookies from "js-cookie";
export default function NumOfUserWBB() {
  const weightUser = Cookies.get("weight");
  const heightUser = Cookies.get("height");
  const ageUser = Cookies.get("age");
  const heightInMeters = 174 / 100;
  const bmi = weightUser / Math.pow(heightInMeters, 2);
  const numOfBMI = bmi.toFixed(2);
  const bmrValue = 10 * weightUser + 6.25 * heightUser - 5 * ageUser;
  let numOfBMR = 0;
  interpretBMR(bmrValue);
  function interpretBMR(bmrValue) {
    let genderUser = Cookies.get("gender");
    let ActivityUser = Cookies.get("activity");
    if (genderUser === "male") {
      bmrValue = bmrValue + 5;

      if (ActivityUser === "Sedentary") {
        bmrValue = bmrValue * 1.2;
      } else if (ActivityUser === "Lightly Active") {
        bmrValue = bmrValue * 1.375;
      } else if (ActivityUser === "Moderately Active") {
        bmrValue = bmrValue * 1.55;
      } else if (ActivityUser === "Very Active") {
        bmrValue = bmrValue * 1.725;
      } else if (ActivityUser === "Super Active") {
        bmrValue = bmrValue * 1.9;
      }
    } else if (genderUser === "female") {
      bmrValue = bmrValue - 161;

      if (ActivityUser === "Sedentary") {
        bmrValue = bmrValue * 1.2;
      } else if (ActivityUser === "Lightly Active") {
        bmrValue = bmrValue * 1.375;
      } else if (ActivityUser === "Moderately Active") {
        bmrValue = bmrValue * 1.55;
      } else if (ActivityUser === "Very Active") {
        bmrValue = bmrValue * 1.725;
      } else if (ActivityUser === "Super Active") {
        bmrValue = bmrValue * 1.9;
      }
    }

    return (numOfBMR = parseInt(bmrValue));
  }
  return (
    <div>
      <div className="weight">
        <div>your weight</div>
        <div className="numofweight">{weightUser}</div>
        <div>Kg</div>
      </div>
      <div className="weight">
        <div>your BMI</div>
        <div className="numofweight">{numOfBMI}</div>
        <div>
          Kg/m<sup>2</sup>
        </div>
      </div>
      <div className="weight">
        <div>your BMR</div>
        <div className="numofweight">{numOfBMR}</div>
        <div>Cal/day</div>
      </div>
    </div>
  );
}
