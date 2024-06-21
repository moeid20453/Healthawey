import { Link } from "react-router-dom";
import "../../assets/Meals.css";
import Header from "../../components/Header";
export default function Meals() {
    return (
      <div className="body3">
        <Header className="" />
        <section className="BC"></section>

        <div className="plan">
          <Link to="/makemeals">
            <button>
              <img src={require("../../img/plan.png")} alt="" />
              <div>Make meals</div>
            </button>
          </Link>
          <Link to="/photoupload">
            <button>
              <img src={require("../../img/camera.png")} alt="" />
              <div>Upload Photo</div>
            </button>
          </Link>
        </div>

        <div className="BreakfastTitle">
          <div>
            <img src={require("../../img/Breakfast1.jpeg")} alt="" />
            <img src={require("../../img/Breakfast2.jpeg")} alt="" />
            <img src={require("../../img/Breakfast3.jpeg")} alt="" />
          </div>
          <div>
            <div>
              <h1>Breakfast</h1>A healthy breakfast is crucial for several
              reasons: Energy Boost: Provides essential nutrients and energy for
              the day. Cognitive Function: Enhances concentration and mental
              performance. Weight Management: Helps control appetite and reduces
              overeating. Nutrient Intake: Delivers vital vitamins, minerals,
              protein, and fiber. Blood Sugar Regulation: Stabilizes blood
              glucose levels. Metabolism: Kickstarts calorie-burning and aids in
              weight control. Heart Health: Promotes healthy cholesterol levels.
              Physical Performance: Supports endurance and recovery in physical
              activities. Mood Regulation: Influences emotional well-being.
              Establishing Habits: Sets a positive tone for healthy eating
              throughout the day.
            </div>
          </div>
        </div>

        <div className="LunchTitle">
          <div>
            <div>
              <h1>Lunch</h1>A healthy lunch is crucial for: Sustained Energy:
              Provides the energy needed for the afternoon. Nutrient Intake:
              Ensures essential nutrients for overall health. Concentration and
              Productivity: Enhances focus and work performance. Weight
              Management: Helps regulate calorie intake and supports healthy
              weight. Blood Sugar Control: Prevents energy crashes and mood
              swings. Digestive Health: Contributes to a well-functioning
              digestive system. Heart Health: Supports cardiovascular health
              with heart-healthy choices. Muscle Repair and Growth: Essential
              for individuals engaged in physical activities. Stress Reduction:
              Aids in stress management and mental well-being. Healthy Habits:
              Reinforces the importance of mindful food choices throughout the
              day.
            </div>
          </div>

          <div>
            <img src={require("../../img/Lunch1.jpeg")} alt="" />
            <img src={require("../../img/Lunch2.jpeg")} alt="" />
            <img src={require("../../img/Lunch3.jpeg")} alt="" />
          </div>
        </div>

        <div className="DinnerTitle">
          <div>
            <img src={require("../../img/Dinner1.jpeg")} alt="" />
            <img src={require("../../img/Dinner2.jpeg")} alt="" />
            <img src={require("../../img/Dinner3.jpeg")} alt="" />
          </div>
          <div>
            <div>
              <h1>Dinner</h1>A healthy dinner is crucial for: Nutrient Intake:
              Provides essential vitamins and minerals. Metabolic Health:
              Supports a healthy metabolism and energy levels. Blood Sugar
              Control: Helps regulate blood sugar levels. Weight Management:
              Contributes to satiety and reduces late-night snacking. Muscle
              Repair: Supports muscle recovery, especially for active
              individuals. Sleep Quality: Certain foods can positively impact
              sleep. Heart Health: Promotes cardiovascular health with
              heart-healthy choices. Digestive Health: Aids in digestion with
              fiber-rich foods. Stress Reduction: Some foods combat stress,
              contributing to mental well-being. Establishing Routine:
              Reinforces mindful eating habits for overall wellnes
            </div>
          </div>
        </div>
      </div>
    );
}