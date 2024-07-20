import { useParams } from "react-router-dom";
import Signin from "./Signin";
import Signup from "./Signup";
import { useContext } from "react";
import { AppContext } from "./App";

function Auth() {
  const { name } = useParams();
  const { setToken, setIsAuthenticated } = useContext(AppContext);

  return (
    <div className="auth-container">
      {name === "signin" && (
        <Signin setIsAuthenticated={setIsAuthenticated} setToken={setToken} />
      )}
      {name === "signup" && <Signup />}
    </div>
  );
}

export default Auth;
