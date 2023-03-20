import React from "react";
import { useNavigate } from "react-router-dom";
import authModel from "../models/authModel";
import "./login.css";

export default function Login({ setToken, user, setUser }) {
  const navigate = useNavigate();

  function changeHandler(event) {
    let newObject = {};

    newObject[event.target.name] = event.target.value;

    setUser({ ...user, ...newObject });
  }

  async function register() {
    const registerResult = await authModel.register(user);

    if (registerResult.data) {
      alert(registerResult.data.message);
      login();
    } else {
      alert(registerResult.errors.message);
    }
  }

  async function login() {
    const loginResult = await authModel.login(user);

    if (loginResult.data.token) {
      setToken(loginResult.data.token);
      navigate("/editor");
    } else {
      alert(loginResult.data.message);
    }
  }
  return (
    <>
      <div className="form-container">
        <label htmlFor="username">Email</label>
        <input
          placeholder="Enter email"
          type="email"
          minLength={6}
          name="email"
          id="username"
          onChange={changeHandler}
        />
        <label htmlFor="password">Password</label>
        <input
          placeholder="Enter password"
          type="password"
          minLength={6}
          name="password"
          id="password"
          onChange={changeHandler}
        />
        <div className="form-button-container">
          <button className="register-button" onClick={register}>
            REGISTER
          </button>
          <button className="sign-in-button" onClick={login}>
            SIGN IN
          </button>
        </div>
      </div>
    </>
  );
}
