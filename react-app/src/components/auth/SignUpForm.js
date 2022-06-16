import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import { closeButton } from "../Navicons";


const SignUpForm = ({close}) => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      console.log(data);
      if (data) {
        setErrors(data);
      }
    } else {
      setErrors(["Repeat Password must match Password"]);
    }
    return;
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const switchModal = () => {
    close()

  }

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <>
    <div className="modalBkg" onClick={close}></div>
    <div className="signUpFormPage">
      <form onSubmit={onSignUp} className="signUpForm">
        <div className="loginModalTitle">Sign Up to LuxBnB</div>
        <div className="signUpErrors">
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className="labelInputSubmitContainerSignup">
          <label>User Name</label>
          <input
            type="text"
            name="username"
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
        <div className="labelInputSubmitContainerSignup">
          <label>Email</label>
          <input
            type="text"
            name="email"
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
        <div className="labelInputSubmitContainerSignup">
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div className="labelInputSubmitContainerSignup">
          <label>Repeat Password</label>
          <input
            type="password"
            name="repeat_password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <div className="loginFormButtons">
          <div className="signUpButtonLogin" onClick={switchModal}>Log In</div>
          <button type="submit" className="loginButton">Sign Up</button>
        </div>
      </form>
    </div>
    </>
  );
};

export default SignUpForm;
