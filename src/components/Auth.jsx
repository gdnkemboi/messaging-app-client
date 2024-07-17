import { useParams } from "react-router-dom";
import Signin from "./Signin";
import Signup from "./Signup";
import PropTypes from "prop-types";
import { useContext } from "react";
import { AppContext } from "./App";

function Auth({ setIsAuthenticated }) {
  const { name } = useParams();
  const { setToken } = useContext(AppContext);

  return (
    <div className="auth-container">
      {name === "signin" && (
        <Signin setIsAuthenticated={setIsAuthenticated} setToken={setToken} />
      )}
      {name === "signup" && <Signup />}
    </div>
  );
}

Auth.propTypes = {
  setIsAuthenticated: PropTypes.func,
};

export default Auth;
