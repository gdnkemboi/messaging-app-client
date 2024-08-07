import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "./App";

const Dashboard = () => {
  const { token, user, apiURL } = useContext(AppContext);

  return (
    <>
      <Outlet context={{token, user, apiURL}} />
    </>
  );
};

export default Dashboard;
