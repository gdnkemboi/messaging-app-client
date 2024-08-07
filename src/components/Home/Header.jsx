import Input from "../Common/Input";
import { useContext, useState } from "react";
import { AppContext } from "./App";
import { useNavigate } from "react-router-dom";
import logo from "/src/assets/icons/chat.svg";

function Header() {
  const { user, handleLogout } = useContext(AppContext);
  const [value, setValue] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="header-container">
      <div className="header">
        <div className="logo-container" onClick={() => navigate("/")}>
          <img src={logo} alt="logo" />
          <h1>ChatApp</h1>
        </div>

        <div className="search-container">
          <box-icon name="search-alt-2"></box-icon>
          <Input
            placeholder="Search..."
            type="text"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            className="search-input"
          />
        </div>

        <div className="profile-pic-container" onClick={toggleSidebar}>
          <div>{user.username}</div>
          <img
            src={user.profilePicture}
            alt="profile picture"
            className="profile-pic"
          />
        </div>
      </div>

      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-content">
          <div className="sidebar-header">
            <div className="close-container">
              <box-icon
                name="x"
                onClick={() => setSidebarOpen(false)}
              ></box-icon>
              <p>Profile</p>
            </div>
          </div>

          <div className="profile-pic-container">
            <img
              src={user.profilePicture}
              alt="profile"
              className="sidebar-profile-pic"
            />
          </div>

          <div className="username-container">
            <p>Your name</p>
            <div className="username">{user.username}</div>
          </div>

          <div className="about-container">
            <p>About</p>
            <p className="about">{user.about}</p>
          </div>

          <div className="profile-actions">
            <div className="sign-out" onClick={handleLogout}>
              <box-icon name="log-out"></box-icon>
              <p>Sign Out</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
