import { Outlet } from "react-router-dom";
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

export default Dashboard;
