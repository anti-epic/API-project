// frontend/src/components/SignupFormModal/index.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
<div className="container">
  <h1 className="title">Sign Up</h1>
  <form onSubmit={handleSubmit}>
    <h2 className="subtitle">Welcome to Airbrb</h2>
    <ul className="has-text-danger">
      {errors.map((error, idx) => (
        <li key={idx}>{error}</li>
      ))}
    </ul>
    <div className="field">
      <label className="label">Email</label>
      <div className="control">
        <input
          className="input"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
    </div>
    <div className="field">
      <label className="label">Username</label>
      <div className="control">
        <input
          className="input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
    </div>
    <div className="field">
      <label className="label">First Name</label>
      <div className="control">
        <input
          className="input"
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>
    </div>
    <div className="field">
      <label className="label">Last Name</label>
      <div className="control">
        <input
          className="input"
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
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
    <div className="field">
      <label className="label">Confirm Password</label>
      <div className="control">
        <input
          className="input"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
    </div>
    <div className="field">
      <div className="control">
        <button className="button is-danger" type="submit">
          Continue
        </button>
      </div>
    </div>
  </form>
</div>

  );
}

export default SignupFormModal;
