import { useParams } from "react-router-dom";
import Signin from "./Signin";
import Signup from "./Signup";
import PropTypes from "prop-types";

function Auth({ setIsAuthenticated }) {
  const { name } = useParams();

  return (
    <>
      {name === "signin" && <Signin setIsAuthenticated={setIsAuthenticated} />}
      {name === "signup" && <Signup />}
    </>
  );
}

Auth.propTypes = {
  setIsAuthenticated: PropTypes.func,
};

export default Auth;
