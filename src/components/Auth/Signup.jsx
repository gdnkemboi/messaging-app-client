import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../Common/Input";
import "boxicons";
import PropTypes from "prop-types";

function Signup({ apiURL }) {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(`${apiURL}/users/signup`, {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.status === 201) {
        navigate("/auth/signin");
      } else if (response.status === 400 && data.error.message) {
        setError(data.error.message);
      } else {
        setError("An error occurred. Please try again later.");
      }
    } catch (error) {
      setError(
        "An error occurred. Please check your connection and try again."
      );
    }
  };

  return (
    <div className="signup-container">
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSignup}>
        <h1>Sign Up</h1>
        <div className="input-box">
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <box-icon name="user" type="solid"></box-icon>
        </div>

        <div className="input-box">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <box-icon name="envelope" type="solid"></box-icon>
        </div>

        <div className="input-box">
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <box-icon name="lock-alt" type="solid"></box-icon>
        </div>

        <div className="input-box">
          <Input
            type="password"
            placeholder="Re-type Password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
          />
          <box-icon name="lock-alt" type="solid"></box-icon>
        </div>

        <button type="submit" className="btn">
          Sign Up
        </button>
        <div className="signin-link">
          <p>
            Already have an account? <Link to="/auth/signin">Sign In</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

Signup.propTypes = {
  apiURL: PropTypes.string,
};

export default Signup;
