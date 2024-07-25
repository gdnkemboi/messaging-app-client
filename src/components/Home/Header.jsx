import Input from "../Common/Input";
import { useContext, useState } from "react";
import { AppContext } from "./App";

function Header() {
  const { user } = useContext(AppContext);
  const [value, setValue] = useState("");
  return (
    <div className="header-container">
      <div className="header">
        <div className="logo-container">
          <img src="/src/assets/icons/chat.svg" alt="logo" />
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

export default Header;
