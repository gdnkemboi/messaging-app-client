import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Auth from "./Auth";
import "../App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const validateToken = async (token) => {
      try {
        const response = await fetch(
          "http://localhost:3000/users/validate-token",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
          }
        );
        const data = await response.json();
        if (data.valid) {
          setIsAuthenticated(true);
        } else {
          navigate("/auth/signin");
        }
      } catch (error) {
        console.error("Error validating token:", error);
        navigate("/auth/signin");
      }
    };

    if (!isAuthenticated) {
      const token = localStorage.getItem("token");
      if (token) {
        validateToken(token);
      } else {
        navigate("/auth/signin");
      }
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      {isAuthenticated ? (
        <Dashboard setIsAuthenticated={setIsAuthenticated} />
      ) : (
        <Auth setIsAuthenticated={setIsAuthenticated} />
      )}
    </>
  );
}

export default App;
