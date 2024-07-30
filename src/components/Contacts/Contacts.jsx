import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Contactinfo from "./Contactinfo";
import "/src/styles/Contacts.css";

const Contacts = () => {
  const [token] = useOutletContext();
  const [contacts, setContacts] = useState([]);
  const [activeContact, setActiveContact] = useState(null);
  const [displayContacts, setDisplayContacts] = useState(true);
  const [displayPendingContacts, setDisplayPendingContacts] = useState(false);
  const [displayBlockedContacts, setDisplayBlockedContacts] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, settError] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/contacts", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("An error occured!");
        }

        const data = await response.json();
        setContacts(data.contacts);
        setLoading(false);
      } catch (err) {
        settError(err);
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <box-icon class="bx bxs-like bx-spin"></box-icon>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="contacts-container">
      <div className="contacts">
        <div className="contacts-navbar">
          <div
            onClick={() => {
              setDisplayContacts(true);
              setDisplayBlockedContacts(false);
              setDisplayPendingContacts(false);
            }}
            className={`accepted ${displayContacts ? "active" : ""}`}
          >
            Contacts
          </div>
          <div
            onClick={() => {
              setDisplayPendingContacts(true);
              setDisplayContacts(false);
              setDisplayBlockedContacts(false);
            }}
            className={`pending ${displayPendingContacts ? "active" : ""}`}
          >
            Pending
          </div>
          <div
            onClick={() => {
              setDisplayBlockedContacts(true);
              setDisplayPendingContacts(false);
              setDisplayContacts(false);
            }}
            className={`blocked ${displayBlockedContacts ? "active" : ""}`}
          >
            Blocked
          </div>
        </div>

        {displayContacts && (
          <div className="user-contacts">
            {contacts.map((contact) =>
              contact.status === "accepted" ? (
                <div
                  key={contact._id}
                  className="contact"
                  onClick={() => setActiveContact(contact)}
                >
                  <img
                    src={contact.contact.profilePicture}
                    alt={`${contact.contact.username} profile picture`}
                    className="profile-picture"
                  />
                  <div className="contact-info">
                    <div className="username"> {contact.contact.username}</div>
                    <div className="about">{contact.contact.about}</div>
                  </div>
                </div>
              ) : null
            )}
          </div>
        )}

        {displayPendingContacts && (
          <div className="pending-contacts">
            {contacts.map((contact) =>
              contact.status === "pending" ? (
                <div
                  key={contact._id}
                  className="contact"
                  onClick={() => setActiveContact(contact)}
                >
                  <img
                    src={contact.contact.profilePicture}
                    alt={`${contact.contact.username} profile picture`}
                    className="profile-picture"
                  />
                  <div className="contact-info">
                    <div className="username"> {contact.contact.username}</div>
                    <div className="about">{contact.contact.about}</div>
                  </div>
                </div>
              ) : null
            )}
          </div>
        )}

        {displayBlockedContacts && (
          <div className="blocked-contacts">
            {contacts.map((contact) =>
              contact.status === "blocked" ? (
                <div
                  key={contact._id}
                  className="contact"
                  onClick={() => setActiveContact(contact)}
                >
                  <img
                    src={contact.contact.profilePicture}
                    alt={`${contact.contact.username} profile picture`}
                    className="profile-picture"
                  />
                  <div className="contact-info">
                    <div className="username"> {contact.contact.username}</div>
                    <div className="about">{contact.contact.about}</div>
                  </div>
                </div>
              ) : null
            )}
          </div>
        )}
      </div>
      {activeContact && (
        <Contactinfo
          activeContact={activeContact}
          token={token}
          setActiveContact={setActiveContact}
        />
      )}
    </div>
  );
};

export default Contacts;
