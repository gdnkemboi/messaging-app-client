import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Dashboard = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

Dashboard.propTypes = {
  setIsAuthenticated: PropTypes.func,
};

export default Dashboard;
