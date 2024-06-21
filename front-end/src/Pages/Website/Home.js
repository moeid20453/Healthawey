import { Link } from 'react-router-dom';
import '../../assets/Home.css';
import Header from '../../components/Header';
import Cookies from 'js-cookie';
export default function Home() {
  const nameUser = Cookies.get("name"); 
  return (
    <div>
      <Header />

      {/* <!-- header section ends -->
    
    <!-- home section starts  --> */}
      <div className="body3">
        <section className="home" id="home">
          <div className="content">
            <h3>Welcome {nameUser !== null && <pre> , {nameUser}</pre>}</h3>
          </div>
        </section>
        <div className="plan">
          <Link to="/bmi">
            <button>
              <img src={require("../../img/BMI.png")} alt="" />
              <div>Calculate BMI</div>
            </button>
          </Link>
          <Link to="/meals">
            <button>
              <img src={require("../../img/plan.png")} alt="" />
              <div>Make my meals</div>
            </button>
          </Link>
          <Link to="/bmr">
            <button>
              <img src={require("../../img/plan2.png")} alt="" />
              <div>Calculate BMR</div>
            </button>
          </Link>
        </div>

        <section className="sec2">
          <div className="wrapper">
            <img src={require("../../img/image.jpg")} alt="" />
            <div className="text-box">
              <h2>Healthawy for healthy life.</h2>
              <p>
                A healthy diet is essential for a healthy life. Our website aims
                to provide you with reliable and evidence-based information on
                nutrition. We believe that everyone should have access to
                accurate information on nutrition, and we strive to make this
                information available to all. Our goal is to help you adopt
                healthy, sustainable diets for life. Thank you for visiting our
                website! 🍎🥦🥕
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}