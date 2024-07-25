import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Contactinfo from "./Contactinfo";

const Contacts = () => {
  const [token] = useOutletContext();
  const [contacts, setContacts] = useState([]);
  const [activeContact, setActiveContact] = useState(null);
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
        <div className="user-contacts">
          <h3>Contacts</h3>
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
                <div> {contact.contact.username}</div>
              </div>
            ) : null
          )}
        </div>
        <div className="pending-contacts">
          <h3>Pending</h3>
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
                <div> {contact.contact.username}</div>
              </div>
            ) : null
          )}
        </div>
        <div className="blocked-contacts">
          <h3>Blocked</h3>
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
                <div> {contact.contact.username}</div>
              </div>
            ) : null
          )}
        </div>
      </div>
      {activeContact && (
        <Contactinfo activeContact={activeContact} token={token} />
      )}
    </div>
  );
};

export default Contacts;
