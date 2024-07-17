import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Header from "./Header";
import Navbar from "./Navbar";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "./App";

const Dashboard = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token, setToken } = useContext(AppContext);

  useEffect(() => {
    const fetchUserDetails = async (token) => {
      console.log(token);
      try {
        const response = await fetch("http://localhost:3000/users/profile", {
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
        console.log(data);
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUserDetails(token);
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
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
    <>
      <Header user={user} />
      <Navbar />
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

Dashboard.propTypes = {
  setIsAuthenticated: PropTypes.func,
};

export default Dashboard;
