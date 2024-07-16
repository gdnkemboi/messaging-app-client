import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Input from "./Input";
import PropTypes from "prop-types";

function Signin({ setIsAuthenticated }) {
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
      console.log(data)

      if (response.status === 200) {
        if (data.token) {
          localStorage.setItem("token", data.token);
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
    <div>
      <h2>Sign In</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSignin}>
        <Input
          type={getInputType(identifier)}
          placeholder="username or email"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />
        <br />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Sign In</button>
      </form>

      <p>
        Don&apos;t have an account? <Link to="/auth/signup">Sign Up</Link>
      </p>
    </div>
  );
}

Signin.propTypes = {
  setIsAuthenticated: PropTypes.func,
};

export default Signin;
