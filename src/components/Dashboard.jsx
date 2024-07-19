import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import { useContext } from "react";
import { AppContext } from "./App";

const Dashboard = () => {
  const { token, user } = useContext(AppContext);

  return (
    <>
      <Outlet context={[token, user]} />
    </>
  );
};

Dashboard.propTypes = {
  setIsAuthenticated: PropTypes.func,
};

export default Dashboard;
