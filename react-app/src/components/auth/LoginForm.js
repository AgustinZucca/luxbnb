import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import "./index.css";

const LoginForm = ({ close }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const demoLogin = (e) => {
    dispatch(login("demo@aa.io", "password"));
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div className="modalBkg" onClick={close}></div>
      <div className="loginModal">
        <form onSubmit={onLogin} className="loginForm">
          <div className="loginModalTitle">Login to LuxBnB</div>
          <div className="loginErrors">
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className="labelInputContainerLogin">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div className="labelInputContainerLogin">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={updatePassword}
            />
          </div>
          <div className="loginFormButtons">
            <div className="signUpButtonLogin">Sign Up</div>
            <button type="submit" className="loginButton">Login</button>
          </div>
        </form>
        <div onClick={demoLogin} className="demoUserButton">
          Demo User
        </div>
      </div>
    </>
  );
};

export default LoginForm;
