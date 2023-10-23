import React, { useState } from "react";
import "../../Login.css";

function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password, "Remember me:", remember);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome!</h2>
        <form onSubmit={handleSubmit}>
        <div className="input-group">
            <i className="fas fa-user"></i>
            <input
              type="email"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <i className="fas fa-envelope"></i>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <i className="fas fa-lock"></i>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span 
              className="toggle-password" 
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
            </span>
          </div>
          <div className="additional-options">
            <label>
              <input type="checkbox" checked={remember} onChange={() => setRemember(!remember)} />
              Remember me
            </label>
            {/* <a href="#!" className="forgot-password">Forgot Password?</a> */}
          </div>
          <p className="error-message">Error message placeholder</p>
          <button type="submit">Sign Up</button>
          
          
          <div className="signup-option">
            <span>or</span>
            <a href="/login">Log In</a>
          </div>


        </form>
      </div>
    </div>
  );
}

export default SignUp;