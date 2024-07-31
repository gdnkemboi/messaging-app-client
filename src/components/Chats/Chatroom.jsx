import { useContext, useEffect, useState, useRef } from "react";
import { ChatContext } from "./Chats";
import Input from "../Common/Input";
import "boxicons";

function Chatroom() {
  const { token, activeChat, user, setViewChatInfo, fetchChats } =
    useContext(ChatContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const lastMessageRef = useRef(null); // Ref for the last message

  const otherParticipant = activeChat.participants.find(
    (participant) => participant._id !== user._id
  );

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/chats/${activeChat._id}/messages`,
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
      fetchChats();
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [activeChat, token]);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/api/messages/${otherParticipant._id}/send`,
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
      await fetchMessages(); // Fetch all messages again after sending a new message
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="chatroom">
      <div className="chatroom-header" onClick={() => setViewChatInfo(true)}>
        <img
          src={otherParticipant.profilePicture}
          alt={`${otherParticipant.username}'s profile`}
          className="profile-picture"
        />
        <div className="chat-info">
          <div className="chat-header">
            <span className="username">{otherParticipant.username}</span>
            <div className="status">{otherParticipant.status}</div>
          </div>
          <box-icon name="dots-vertical-rounded"></box-icon>
        </div>
      </div>

      <div className="chatroom-body">
        {messages.map((message, index) => (
          <div
            key={message._id}
            ref={index === messages.length - 1 ? lastMessageRef : null}
            className={`message-container ${
              message.sender._id === user._id ? "right" : "left"
            }`}
          >
            <div className="message-bubble">
              <div className="message-text">{message.content}</div>
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

      <div className="chatroom-footer">
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

export default Chatroom;
