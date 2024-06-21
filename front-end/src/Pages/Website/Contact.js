import Header from "../../components/Header";
import "../../assets/Contact.css";

export default function Contact() {
  return (
    <div>
      <Header />
      <div className="body4">
        <section className="sectionC">
          <div className="section-header">
            <div className="containerC">
              <h2>Contact Us</h2>
              <p>
                Welcome to our Healthawy Nutrition contact us page! We're here
                to answer your questions, provide guidance, and share knowledge
                on the path to a healthier and more balanced lifestyle.
              </p>
            </div>
          </div>

          <div className="containerC">
            <div className="row">{/* Other content */}</div>

            <div className="contact-info-item">
              <div className="contact-info-icon">
                <i className="fas fa-phone"></i>
              </div>
              <div className="contact-info-content">
                <h4>Phone</h4>
                <p>19-111</p>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-info-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <div className="contact-info-content">
                <h4>Email</h4>
                <p>Healthawy@gmail.com</p>
              </div>
            </div>
          </div>

          <div className="contact-form">
            <form action="" id="contact-form">
              <h2>Send Message</h2>
              <div className="input-box">
                <input
                  type="text"
                  required={true}
                  name=""
                  placeholder="Full Name"
                />
              </div>

              <div className="input-box">
                <input
                  type="email"
                  required={true}
                  name=""
                  placeholder="Email"
                />
              </div>

              <div className="input-box">
                <textarea
                  required={true}
                  name=""
                  placeholder="Type your Message..."
                ></textarea>
              </div>

              <div className="send-box">
                <button className="send" type="submit">
                  Send
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
