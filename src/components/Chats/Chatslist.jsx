import { useEffect, useState } from "react";
import "boxicons";
import { useContext } from "react";
import { ChatContext } from "./Chats";
import Modal from "../Common/Modal";

function Chatslist() {
  const { chats, setActiveChat, user, token } = useContext(ChatContext);
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      } catch (err) {
        setError(err);
      }
    };

    fetchContacts();
  }, [token]);

  const handleCreateChat = () => {
    setIsModalOpen(true);
  };

  const handleContactClick = async (contact) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/chats/${contact.contact._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      console.log(data);
      setActiveChat(data.chat);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  if (chats.length === 0) {
    return (
      <div>
        <h3>ALL CHATS</h3>
        <p>No chats available.</p>
      </div>
    );
  }

  return (
    <div className="chats-list">
      <p>ALL CHATS</p>
      <ul>
        {chats.map((chat) => {
          const otherParticipant = chat.participants.find(
            (participant) => participant._id !== user._id
          );

          return (
            <li
              key={chat._id}
              className="chat-item"
              onClick={() => setActiveChat(chat)}
            >
              <img
                src={otherParticipant.profilePicture}
                alt={`${otherParticipant.username}'s profile`}
                className="profile-picture"
              />
              <div className="chat-info">
                <div className="chat-header">
                  <div className="username">{otherParticipant.username}</div>
                  {chat.lastMessageId && (
                    <div className="last-message">
                      {`${chat.lastMessageId.content.slice(0, 10)}${
                        chat.lastMessageId.content.length > 10 ? "..." : ""
                      }`}
                    </div>
                  )}
                </div>
                {chat.lastMessageId && (
                  <div className="timestamp">
                    {new Date(chat.lastMessageId.timestamp).toLocaleTimeString(
                      "en-US",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      }
                    )}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
      <div className="create-chat" onClick={handleCreateChat}>
        <box-icon name="message-alt-add"></box-icon>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Select a contact to start a chat"
      >
        <div className="contacts">
          {contacts.map((contact) => (
            <div
              key={contact._id}
              className="contact-item"
              onClick={() => handleContactClick(contact)}
            >
              <img
                src={contact.contact.profilePicture}
                alt={`${contact.contact.username}'s profile`}
                className="profile-picture"
              />
              <div className="contact-info">
                <div className="username">{contact.contact.username}</div>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}

export default Chatslist;
