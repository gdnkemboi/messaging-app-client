import { NavLink } from "react-router-dom";
import ChatsIcon from "/src/assets/icons/chats.svg";
import GroupsIcon from "/src/assets/icons/groups.svg";
import ContactsIcon from "/src/assets/icons/contacts.svg";
import NotsIcon from "/src/assets/icons/notifications.svg";

function Navbar() {
  return (
    <div className="navbar-container">
      <div className="navbar">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `icon-container ${isActive ? "active" : ""}`
          }
        >
          <img src={ChatsIcon} alt="chats-icon" />
        </NavLink>
        <NavLink
          to="/groups"
          className={({ isActive }) =>
            `icon-container ${isActive ? "active" : ""}`
          }
        >
          <img src={GroupsIcon} alt="groups-icon" />
        </NavLink>
        <NavLink
          to="/contacts"
          className={({ isActive }) =>
            `icon-container ${isActive ? "active" : ""}`
          }
        >
          <img src={ContactsIcon} alt="contacts-icon" />
        </NavLink>
        <NavLink
          to="/notifications"
          className={({ isActive }) =>
            `icon-container ${isActive ? "active" : ""}`
          }
        >
          <img src={NotsIcon} alt="notifications-icon" />
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;
