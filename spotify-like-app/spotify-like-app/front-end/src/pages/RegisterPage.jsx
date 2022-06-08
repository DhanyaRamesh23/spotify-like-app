import Axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const SubmitHandler = (e) => {
    e.preventDefault();
    const data = {
      name,
      email,
      password,
    };

    // Validation
    if (name.trim().length === 0) {
      window.alert("Name required!");
      return;
    } else if (email.trim().length === 0) {
      window.alert("Email required!");
      return;
    } else if (
      !email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      window.alert("Email should be valid!");
      return;
    } else if (password.trim().length === 0) {
      window.alert("Password required!");
      return;
    }

    Axios.post(SERVER_URL + "api/user/register", data)
      .then((res) => {
        if (res.status === 200) {
          // Success! Redirect to login
          navigate("/login");
        }
      })
      .catch((err) => {
        if (err.response.status === 409) {
          window.alert("Email already registered!");
        }
      });
    setPassword("");
  };
  return (
    <>
      <section>
        <h2>Register</h2>
        <form>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <button type="submit" onClick={SubmitHandler}>
            Register
          </button>
        </form>
      </section>
    </>
  );
}
