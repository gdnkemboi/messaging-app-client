import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Auth from "./Auth";

export const AppContext = createContext({
  token: null,
  setToken: null,
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const [token, setToken] = useState(null);

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
          setToken(token);
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
      <AppContext.Provider value={{ token, setToken }}>
        {isAuthenticated ? (
          <Dashboard setIsAuthenticated={setIsAuthenticated} />
        ) : (
          <Auth setIsAuthenticated={setIsAuthenticated} />
        )}
      </AppContext.Provider>
    </>
  );
}

export default App;
