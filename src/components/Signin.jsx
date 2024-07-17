import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Input from "./Input";
import PropTypes from "prop-types";
import "boxicons";

function Signin({ setIsAuthenticated, setToken }) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/users/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier,
          password,
        }),
      });
      const data = await response.json();
      console.log(data);

      if (response.status === 200) {
        if (data.token) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          setIsAuthenticated(true);
          navigate("/");
        }
      } else if (response.status === 401) {
        setError("Invalid credentials. Please try again.");
      } else {
        setError("An error occurred. Please try again later.");
      }
    } catch (error) {
      setError(
        "An error occurred. Please check your connection and try again."
      );
    }
  };

  // Function to determine the type based on the input value
  const getInputType = (value) => {
    return value.includes("@") ? "email" : "text";
  };

  return (
    <div className="signin-container">
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSignin}>
        <h1>Sign In</h1>
        <div className="input-box">
          <Input
            type={getInputType(identifier)}
            placeholder="Username or Email"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
          <box-icon type="solid" name="user"></box-icon>
        </div>

        <div className="input-box">
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <box-icon type="solid" name="lock-alt"></box-icon>
        </div>

        <div className="remember-forgot">
          <label>
            <Input type="checkbox" />
            Remember me
          </label>
          <Link to="#">Forgot password</Link>
        </div>
        <button type="submit" className="btn">
          Sign In
        </button>
        <div className="signup-link">
          <p>
            Don&apos;t have an account? <Link to="/auth/signup">Sign Up</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

Signin.propTypes = {
  setIsAuthenticated: PropTypes.func,
  setToken: PropTypes.func,
};

export default Signin;
