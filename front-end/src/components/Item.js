    import React from "react";
import Header from "../../components/Header";
import "../../assets/MakeMeals.css";
import {useMeals} from "react-use-cart"
const item = (props) => {
    const { addItem } = useMeals();
  return (
    <div className="bodyFood">
      <Header />
      <div className="foodItem">
        <div className="item">
          <div className="imageItem">
            <img src={require("../../img/Breakfast2.jpeg")} />
          </div>
          <div className="name">name</div>
          <div className="details">
            <div>
              Water <span>00.00</span>
            </div>
            <div>
              Energy <span>00.00</span>
            </div>
            <div>protien</div>
            <div>Lipid</div>
            <div>Ash</div>
            <div>carbohydrat</div>
            <div>fiber</div>
            <div>sugar</div>
          </div>
          <div className="itemWeight">
            <span>weight:</span>100 gram
          </div>
          <div className="btnAdd">
            <button>Add</button>
          </div>
        </div>

        <div className="item">
          <div className="imageItem">
            <img src={require("../../img/Breakfast3.jpeg")} />
          </div>
          <div className="name">name</div>
          <div className="details">
            <div>Water</div>
            <div>Energy</div>
            <div>protien</div>
            <div>Lipid</div>
            <div>Ash</div>
            <div>carbohydrat</div>
            <div>fiber</div>
            <div>sugar</div>
          </div>
          <div className="itemWeight">100 gram</div>
          <div className="btnAdd">
            <button>Add</button>
          </div>
        </div>

        <div className="item">
          <div className="imageItem">
            <img src={require("../../img/Breakfast1.jpeg")} />
          </div>
          <div className="name">name</div>
          <div className="details">
            <div>Water</div>
            <div>Energy</div>
            <div>protien</div>
            <div>Lipid</div>
            <div>Ash</div>
            <div>carbohydrat</div>
            <div>fiber</div>
            <div>sugar</div>
          </div>
          <div className="itemWeight">100 gram</div>
          <div className="btnAdd">
            <button>Add</button>
          </div>
        </div>

        <div className="item">
          <div className="imageItem">
            <img src={require("../../img/Breakfast1.jpeg")} />
          </div>
          <div className="name">name</div>
          <div className="details">
            <div>Water</div>
            <div>Energy</div>
            <div>protien</div>
            <div>Lipid</div>
            <div>Ash</div>
            <div>carbohydrat</div>
            <div>fiber</div>
            <div>sugar</div>
          </div>
          <div className="itemWeight">100 gram</div>
          <div className="btnAdd">
            <button>Add</button>
          </div>
        </div>

        <div className="item">
          <div className="imageItem">
            <img src={require("../../img/Breakfast1.jpeg")} />
          </div>
          <div className="name">name</div>
          <div className="details">
            <div>Water</div>
            <div>Energy</div>
            <div>protien</div>
            <div>Lipid</div>
            <div>Ash</div>
            <div>carbohydrat</div>
            <div>fiber</div>
            <div>sugar</div>
          </div>
          <div className="itemWeight">100 gram</div>
          <div className="btnAdd">
            <button>Add</button>
          </div>
        </div>

        <div className="item">
          <div className="imageItem">
            <img src={require("../../img/Breakfast1.jpeg")} />
          </div>
          <div className="name">name</div>
          <div className="details">
            <div>Water</div>
            <div>Energy</div>
            <div>protien</div>
            <div>Lipid</div>
            <div>Ash</div>
            <div>carbohydrat</div>
            <div>fiber</div>
            <div>sugar</div>
          </div>
          <div className="itemWeight">100 gram</div>
          <div className="btnAdd">
            <button onClick={addItem}>Add</button>
          </div>
        </div>
      </div>
    </div>
  );
}
