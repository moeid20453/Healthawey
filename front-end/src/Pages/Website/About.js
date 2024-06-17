import Header from "../../components/Header"
import '../../assets/About.css';
export default function About() {
    return (

        <div>
            <Header />
            <div className="body5">
            <section className="about" id="about">

    
        <div className="row">
    
            <div className="image">
                        <img src={require("../../img/about-img.jpg")} alt=""/>
            </div>
    
            <div className="content">
                <h3>why choose us?</h3>
                <p>our website can provide you with a wealth of information on the nutritional value of different foods, as well as tips on how to eat a healthy diet. Additionally, a website can help you track your food intake and monitor your progress towards your health goals. Finally, a website can provide you with a community of like-minded individuals who can offer support and encouragement as you work towards your health goals.</p>
            </div>
    
        </div>
    
                </section>
                </div>
        </div>
    )
}