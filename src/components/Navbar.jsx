function Navbar() {
  return (
    <div className="navbar-container">
      <div className="navbar">
        <div className="icon-container">
          <img src="/src/assets/icons/chats.svg" alt="chats-icon" />
        </div>
        <div className="icon-container">
          <img src="/src/assets/icons/groups.svg" alt="groups-icon" />
        </div>
        <div className="icon-container">
          <img src="/src/assets/icons/contacts.svg" alt="contacts-icon" />
        </div>
        <div className="icon-container">
          <img
            src="/src/assets/icons/notifications.svg"
            alt="notifications-icon"
          />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
