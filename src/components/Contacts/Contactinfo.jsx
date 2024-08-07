import PropTypes from "prop-types";
import "boxicons";

function Contactinfo({ activeContact, token, setActiveContact, apiURL }) {
  const contact = activeContact.contact;

  /// TODO ///
  const handleSendMessage = () => {};

  /// TODO ///
  const handleAddContacts = async () => {};

  const handleBlockUser = async () => {
    try {
      const response = await fetch(
        `${apiURL}/contacts/${contact._id}/block`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("An error occurred. Please try again.");
      }

      if (response.status === 200) {
        console.log(`${contact.username} blocked successfully`);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  /// TODO ///
  const handleDeleteContact = async () => {};

  return (
    <div className="contact-info">
      <div className="contact-info-header">
        <div className="close-container">
          <box-icon name="x" onClick={() => setActiveContact(null)}></box-icon>
          <p>Contact info</p>
        </div>
      </div>
      <div className="contact-details">
        <div className="profile-pic-container">
          <img
            src={contact.profilePicture}
            alt={`${contact.username}'s profile`}
            className="profile-picture"
          />
          <div className="username">{contact.username}</div>
          <div className="status">{contact.status}</div>
        </div>
        <div className="about-container">
          <p>About</p>
          <p className="about">{contact.about}</p>
        </div>
      </div>
      <div className="contact-actions">
        <div className="send-message" onClick={handleSendMessage}>
          <box-icon name="message-square-detail"></box-icon>
          <p>Send message</p>
        </div>

        {activeContact.status === "pending" && (
          <div className="add-contacts" onClick={handleAddContacts}>
            <box-icon type="solid" name="contact"></box-icon>
            <p>Add to contacts</p>
          </div>
        )}

        {activeContact.status === "accepted" && (
          <div className="block-user" onClick={handleBlockUser}>
            <box-icon name="block"></box-icon>
            <p>{`Block ${contact.username}`}</p>
          </div>
        )}

        {activeContact.status === "blocked" && (
          <div className="block-user" onClick={handleAddContacts}>
            <box-icon name="lock-open"></box-icon>
            <p>{`Unblock ${contact.username}`}</p>
          </div>
        )}

        {activeContact.status === "accepted" ||
        activeContact.status === "pending" ? (
          <div className="delete-contact" onClick={handleDeleteContact}>
            <box-icon name="trash"></box-icon>
            <p>Remove from contacts</p>
          </div>
        ) : null}

        <div className="report-user">
          <box-icon name="dislike"></box-icon>
          <p>{`Report ${contact.username}`}</p>
        </div>
      </div>
    </div>
  );
}

Contactinfo.propTypes = {
  activeContact: PropTypes.object,
  token: PropTypes.string,
  setActiveContact: PropTypes.func,
  apiURL: PropTypes.string,
};

export default Contactinfo;
