import { useContext, useEffect, useState } from "react";
import Input from "../Common/Input";
import { GroupContext } from "./Groups";

function decodeHTMLEntities(text) {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
}

function Groupchat() {
  const { token, activeGroup, setViewGroupInfo } = useContext(GroupContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  console.log(activeGroup);

  useEffect(() => {
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

    fetchMessages();
  }, [activeGroup, token]);

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
      setMessages((prevMessages) => [...prevMessages, data.message]);
      setNewMessage("");
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
          className="profile-picture"
        />
        <div className="group-info">
          <div className="group-header">
            <span className="username">{activeGroup.name}</span>
            <div className="status">{activeGroup.status}</div>
          </div>
          <box-icon name="dots-horizontal-rounded"></box-icon>
        </div>
      </div>

      <div className="chatroom-body">
        {messages.map((message) => (
          <div key={message._id} className="message">
            <div className="message-content">
              {decodeHTMLEntities(message.content)}
            </div>
            <div className="message-timestamp">
              {new Date(message.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>

      <div className="chatroom-footer">
        <form onSubmit={sendMessage}>
          <Input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            required
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default Groupchat;
