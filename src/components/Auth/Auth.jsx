import { useParams } from "react-router-dom";
import Signin from "./Signin";
import Signup from "./Signup";
import { useContext } from "react";
import { AppContext } from "../Home/App";
import "/src/styles/Auth.css";

function Auth() {
  const { name } = useParams();
  const { setToken, setIsAuthenticated, apiURL } = useContext(AppContext);

  return (
    <div className="auth-container">
      {name === "signin" && (
        <Signin
          setIsAuthenticated={setIsAuthenticated}
          setToken={setToken}
          apiURL={apiURL}
        />
      )}
      {name === "signup" && <Signup apiURL={apiURL} />}
    </div>
  );
}

export default Auth;
