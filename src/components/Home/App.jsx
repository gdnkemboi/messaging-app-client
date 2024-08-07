import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Navbar from "./Navbar";
import Auth from "../Auth/Auth";
import Dashboard from "./Dashboard";
import "/src/styles/App.css";

export const AppContext = createContext({
  token: "",
  setToken: () => {},
  user: {},
  setUser: () => {},
  setIsAuthenticated: () => {},
  apiURL: "",
});

function App() {
  const apiURL = import.meta.env.VITE_API_URL;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const validateToken = async (token) => {
      try {
        const response = await fetch(`${apiURL}/users/validate-token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });
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

    const token = localStorage.getItem("token");
    if (token) {
      validateToken(token);
    } else {
      setLoading(false);
      navigate("/auth/signin");
    }
  }, [apiURL, isAuthenticated, navigate]);

  useEffect(() => {
    const fetchUserDetails = async (token) => {
      try {
        const response = await fetch(`${apiURL}/users/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }

        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUserDetails(token);
    }
  }, [apiURL, token]);

  if (loading) {
    return (
      <div className="loading-container">
        <box-icon className="bx bxs-like bx-spin"></box-icon>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setToken(null);
    navigate("/");
  };

  return (
    <AppContext.Provider
      value={{
        token,
        setToken,
        user,
        setIsAuthenticated,
        handleLogout,
        apiURL,
      }}
    >
      {isAuthenticated ? (
        user && (
          <>
            <Header />
            <Navbar />
            <Dashboard />
          </>
        )
      ) : (
        <Auth />
      )}
    </AppContext.Provider>
  );
}

export default App;
