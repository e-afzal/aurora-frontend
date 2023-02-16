import '../../styles/login.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// REDUX RELATED
import { useDispatch } from "react-redux";
import { login } from "../../reducers/userReducer";

// COMPONENT(S)
import Navbar from '../../components/Navbar';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // STATES
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [userData, setUserData] = useState({});
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
      email: userInfo.email,
      password: userInfo.password,
    };

    axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, body).then((res) => {
      const {
        first_name: firstName,
        last_name: lastName,
        ...otherDetails
      } = res.data;
      const newData = { firstName, lastName, ...otherDetails };
      setUserData(newData);
      dispatch(login(newData));
      navigate("/account/dashboard", { replace: true });
    }).catch((err) => {
      setErrorMessage(err.response.data.message);
    });

  };
  return (
    <>
      <Navbar marginBottom={"5.5rem"} />
      <section className="login-grid">
        <div className="login-title">
          <h1>login</h1>
        </div>

        <div className="login-container">
          <form className="login-form">

            <div className="email-group">
              <p className="form-subtitle">Email</p>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                required
                onChange={handleInput}
              />
            </div>

            <div className="password-group">
              <p className="form-subtitle">Password</p>
              <div className="password-container">
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  required
                  onChange={handleInput}
                />

                <button>Forgot Password?</button>
              </div>
            </div>

            <button onClick={handleSubmit}>Login</button>
            <p style={{ color: "crimson" }}>{errorMessage.length > 0 ? errorMessage : null}</p>
          </form>
          <p className="create-account">
            Don't have an account?{" "}
            <a href="/account/signup" >
              Create one
            </a>
          </p>
        </div>
      </section>
    </>

  );
};

export default Login;
