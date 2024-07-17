import PropTypes from "prop-types";
import Input from "./Input";
import { useState } from "react";

function Header({ user }) {
  const [value, setValue] = useState("");
  return (
    <div className="header-container">
      <div className="header">
        <div className="logo-container">
          <img src="/src/assets/icons/chat.svg" alt="logo" />
          <div>ChatApp</div>
        </div>

        <div className="search-container">
          <Input
            placeholder="Search..."
            type="text"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            className="search-input"
          />
        </div>

        <div className="profile-pic-container">
          <div>{user.username}</div>
          <img
            src={user.profilePicture}
            alt="profile picture"
            className="profile-pic"
          />
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  user: PropTypes.object,
};

export default Header;
