import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "./Input";

function Signup() {
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
      const response = await fetch("http://localhost:3000/users/signup", {
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
        </div>

        <div className="input-box">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-box">
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="input-box">
          <Input
            type="password"
            placeholder="Re-type Password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
          />
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

export default Signup;
