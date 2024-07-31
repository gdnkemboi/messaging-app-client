import { useContext, useEffect, useState, useRef } from "react";
import Input from "../Common/Input";
import { GroupContext } from "./Groups";
import "boxicons";

function decodeHTMLEntities(text) {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
}

function Groupchat() {
  const { token, activeGroup, setViewGroupInfo, user, fetchGroups } =
    useContext(GroupContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const lastMessageRef = useRef(null); // Ref for the last message

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/groups/${activeGroup._id}/messages`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("An error occurred while fetching messages.");
      }

      const data = await response.json();
      setMessages(data.messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [activeGroup, token]);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/api/groups/${activeGroup._id}/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content: newMessage }),
        }
      );

      if (!response.ok) {
        throw new Error("An error occurred while sending the message.");
      }

      const data = await response.json();
      setNewMessage("");
      fetchMessages(); // Fetch all messages again after sending a new message
      fetchGroups();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="group-chat">
      <div className="group-chat-header" onClick={() => setViewGroupInfo(true)}>
        <img
          src={activeGroup.groupIcon}
          alt={`${activeGroup.name}'s profile`}
          className="group-icon"
        />
        <div className="group-info">
          <div className="group-header">
            <span className="group-name">{activeGroup.name}</span>
            <div className="members">
              {`${activeGroup.members
                .slice(0, 5)
                .map((member) => member.username)
                .join(", ")}${activeGroup.members > 5 ? "..." : ""}`}
            </div>
          </div>
          <box-icon name="dots-vertical-rounded"></box-icon>
        </div>
      </div>

      <div className="group-chatroom">
        {messages.map((message, index) => (
          <div
            key={message._id}
            ref={index === messages.length - 1 ? lastMessageRef : null}
            className={`message-container ${
              message.sender._id === user._id ? "right" : "left"
            }`}
          >
            <div className="message-bubble">
              <div className="message-text">
                {decodeHTMLEntities(message.content)}
              </div>
              <div className="message-timestamp">
                {new Date(message.timestamp).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="group-chatroom-footer">
        <form onSubmit={sendMessage}>
          <Input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            required
          />
          <button type="submit">
            <box-icon type="logo" name="telegram"></box-icon>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Groupchat;
