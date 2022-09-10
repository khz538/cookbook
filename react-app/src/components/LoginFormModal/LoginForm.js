// frontend/src/components/LoginFormModal/LoginForm.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './LoginForm.css';

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    // <div className="login-wrapper">
    //   <h2 className="login-title">Log In</h2>
    //   <form onSubmit={handleSubmit}>
    //     <ul>
    //       {errors.map((error, idx) => (
    //         <li key={idx}>{error}</li>
    //       ))}
    //     </ul>
    //     <label>
    //       Username or Email
    //       <input
    //         className="login-input"
    //         type="text"
    //         value={credential}
    //         onChange={(e) => setCredential(e.target.value)}
    //         required
    //       />
    //     </label>
    //     <label>
    //       Password
    //       <input
    //         className="login-input"
    //         type="password"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //         required
    //       />
    //     </label>
    //     <button className='login-btn' type="submit">Log In</button>
    //   </form>
    // </div>
    <div className="signup-wrapper">
      <h2 className="signup-title">Log In</h2>
      <form onSubmit={handleSubmit}>
        <div className="signup-inner-wrapper">
        <div className="signup-fields">
          <label>
            Username or Email
            <input
              className="signup-input"
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              className="signup-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
          <button className="signup-btn" type="submit">Sign Up</button>
        </div>
        <div className="signup-validation-errors">
          <ul className="error-list">
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
