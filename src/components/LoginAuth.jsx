import React from "react";
import Login from "./Login";

export default function Auth({ setToken, user, setUser }) {
  return (
    <div className="auth-container">
      <h2>Sign in or register to use the text editor</h2>

      <Login setToken={setToken} user={user} setUser={setUser} />
    </div>
  );
}
