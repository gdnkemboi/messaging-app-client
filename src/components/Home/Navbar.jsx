import { NavLink } from "react-router-dom";

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
          <img src="/src/assets/icons/chats.svg" alt="chats-icon" />
        </NavLink>
        <NavLink
          to="/groups"
          className={({ isActive }) =>
            `icon-container ${isActive ? "active" : ""}`
          }
        >
          <img src="/src/assets/icons/groups.svg" alt="groups-icon" />
        </NavLink>
        <NavLink
          to="/contacts"
          className={({ isActive }) =>
            `icon-container ${isActive ? "active" : ""}`
          }
        >
          <img src="/src/assets/icons/contacts.svg" alt="contacts-icon" />
        </NavLink>
        <NavLink
          to="/notifications"
          className={({ isActive }) =>
            `icon-container ${isActive ? "active" : ""}`
          }
        >
          <img
            src="/src/assets/icons/notifications.svg"
            alt="notifications-icon"
          />
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;
