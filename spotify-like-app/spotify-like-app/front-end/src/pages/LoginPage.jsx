import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { hasToken, login } from "../services/Auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigator = useNavigate();

  const HandleSubmit = (e) => {
    e.preventDefault();

    // Validation

    if (email.trim().length === 0) {
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

    login(email, password).then((res) => {
      if (res) navigator("/");
    });
  };

  if (hasToken()) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <section>
        <h2>Login</h2>
        <form onSubmit={HandleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit">Login</button>
        </form>
      </section>
    </>
  );
}
