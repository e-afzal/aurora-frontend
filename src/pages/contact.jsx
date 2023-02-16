import '../styles/contact.css';
import { useState } from 'react';
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

// COMPONENT(S)
import Navbar from './../components/Navbar';
import Footer from '../components/Footer';

const Contact = () => {
  const [senderDetails, setSenderDetails] = useState({
    name: "",
    senderEmail: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/message`, senderDetails)
      .then(res => {
        if (res.data.success === true) {
          toast.success("Message sent successfully", { style: { fontSize: "13.5px" }, duration: 4500 });
          setSenderDetails(prevState => {
            return {
              name: "",
              senderEmail: "",
              subject: "",
              message: ""
            };
          });
        }
        if (res.data.success === false) {
          toast.error("Please try again", { style: { fontSize: "13.5px" } });
        }
      })
      .catch(error => console.log(error.message));

  };

  const handleChange = (e) => {
    setSenderDetails(prevState => {
      return {
        ...prevState,
        [e.target.name]: e.target.value
      };
    });
  };

  return (
    <>
      <Navbar marginBottom={"5.5rem"} />

      {/* TOAST */}
      <Toaster position="bottom-center" />

      <section className="contact-grid">
        <div className="contact-title">
          <h1>Contact us</h1>
        </div>

        <div className="contact-form-container">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="name-group">
              <p className="form-subtitle">Name</p>
              <input
                type="text"
                required
                name="name"
                id="name"
                placeholder="Enter your name"
                onChange={handleChange}
                value={senderDetails.name}
              />
            </div>
            <div className="email-group">
              <p className="form-subtitle">Email</p>
              <input
                type="email"
                name="senderEmail"
                id="email"
                placeholder="Enter your email address"
                required
                onChange={handleChange}
                value={senderDetails.senderEmail}
              />
            </div>
            <div className="subject-group">
              <p className="form-subtitle">Subject</p>
              <input
                type="text"
                name="subject"
                id="subject"
                placeholder="Enter the subject"
                required
                onChange={handleChange}
                value={senderDetails.subject}
              />
            </div>
            <div className="message-group">
              <p className="form-subtitle">Message</p>
              <textarea
                required
                name="message"
                id="message"
                placeholder="Enter your message here"
                onChange={handleChange}
                value={senderDetails.message}
              ></textarea>
            </div>

            <button type='submit' style={{ marginBottom: "3rem" }}>send message</button>
          </form>
        </div>
      </section>
      <Footer />
    </>

  );
};

export default Contact;
