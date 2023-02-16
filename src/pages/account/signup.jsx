import '../../styles/signup.css';

import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

// REDUX RELATED
import { useDispatch } from "react-redux";
import { register } from "../../reducers/userReducer";

// COMPONENT(S)
import Navbar from '../../components/Navbar';

const Signup = () => {
  const navigate = useNavigate();
  const boilerplate = [
    {
      div: "fName-group",
      text: "First Name",
      type: "text",
      name: "firstName",
      id: "fName",
      placeholder: "Enter your first name",
      style: "capitalize"
    },
    {
      div: "lName-group",
      text: "Last Name",
      type: "text",
      name: "lastName",
      id: "lName",
      placeholder: "Enter your last name",
      style: "capitalize"
    },
    {
      div: "email-group",
      text: "Email",
      type: "email",
      name: "email",
      id: "email",
      placeholder: "E.g. acme@domain.com",
      style: "lowercase"
    },
    {
      div: "password-group",
      text: "Password",
      type: "password",
      name: "password",
      id: "password",
      placeholder: "Enter your password",
      style: "none"
    },
  ];

  // REDUX RELATED
  const dispatch = useDispatch();

  // STATES
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    apartment: "",
    address: "",
    city: "",
    country: "",
    phone: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  // HANDLERS
  const handleInput = (e) => {
    setUserInfo((prev) => {
      return { ...prev, [e.target.name]: e.target.value.trim() };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    const body = {
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: userInfo.email,
      password: userInfo.password,
    };

    //? Send 'body' to DB for verification and saving, if ok.
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/register`, body).then(res => {
      // Renaming 'first_name' and 'last_name' received from DB
      const {
        first_name: firstName,
        last_name: lastName,
        ...otherDetails
      } = res.data.data;

      const newData = { firstName, lastName, ...otherDetails };

      //? Sending 'newData' to be saved to STATE
      dispatch(register(newData));
      navigate("/account/dashboard");
    }).catch(err => {
      //? If error caught from SERVER, display on 'frontend'.
      //* Below error path is EXACTLY as 'AXIOS'
      setErrorMessage(err.response.data.message);
    });
  };

  return (
    <>
      <Navbar marginBottom={"5.5rem"} />
      <section className="signup-grid">
        <div className="signup-title">
          <h1>register</h1>
        </div>

        <div className="signup-container">
          <form onSubmit={handleSubmit} className="signup-form">
            {boilerplate.map((eachInput, index) => (
              <div key={index} className={eachInput.div}>
                <p className="form-subtitle">{eachInput.text}</p>
                <input
                  style={{ textTransform: eachInput.style }}
                  type={eachInput.type}
                  name={eachInput.name}
                  id={eachInput.id}
                  placeholder={eachInput.placeholder}
                  required
                  onChange={handleInput}
                />
              </div>
            ))}

            <button>create account</button>
            <p style={{ color: "crimson" }}>{errorMessage && errorMessage}</p>
          </form>
        </div>
      </section>
    </>

  );
};

export default Signup;
