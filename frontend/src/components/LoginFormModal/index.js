// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(password.length < 1|| credential.length < 1){
      return setErrors(['You must enter a Username/Email and a password']);
    }
    if(password && credential){



    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then((res)=> {

        // closeModal
      })
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.message) {
            return setErrors([data.message])
          };
        }
      );
    }

    return setErrors(['You must enter a Username/Email and a password']);

  };

  return (
    <>


<div className="container">
      <h1 className="title">Log In</h1>
      <form onSubmit={handleSubmit}>
        <ul className="errorText">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div className="field">
          <label className="label">Username or Email</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Username or Email"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              className="input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="control loginButton">
          <button className="button is-danger loginButton" type="submit">
            Log In
          </button>
        </div>
      </form>
    </div>








    </>
  );
}

export default LoginFormModal;
