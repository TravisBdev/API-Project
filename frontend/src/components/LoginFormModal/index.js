import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const logInDemo = () => {
    setCredential('Demo-lition')
    setPassword('password')
  }

  return (
    <div className="log-in-box">
      <div className="header"><h1>Log In</h1></div>
      <form onSubmit={handleSubmit} className="login-form">

        <div className="username-email">
          <div><label>Username or Email</label></div>
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </div>

        <div className="password">
          <div><label>Password</label></div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {errors.credential && (
          <p>{errors.credential}</p>
        )}

        <div className="log-in-btn-box">
          <button type="submit" className="login-btn"
            disabled={password.length < 6 || credential.length < 4}>Log In</button>
        </div>

        <div className="demo-login">
          <button className="demo-login-btn" onClick={logInDemo}>
            Log in as Demo User
          </button>
        </div>

      </form>
    </div>
  );
}

export default LoginFormModal;
