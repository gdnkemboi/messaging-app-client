import { useContext, useEffect, useState } from "react";
import { ChatContext } from "./Chats";
import Input from "../Common/Input";

function Chatroom() {
  const { token, activeChat, user } = useContext(ChatContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const otherParticipant = activeChat.participants.find(
    (participant) => participant._id !== user._id
  );

  useEffect(() => {
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
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [activeChat, token]);

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
      setMessages((prevMessages) => [...prevMessages, data.message]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="chatroom">
      <div className="chatroom-header">
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
          <box-icon name="dots-horizontal-rounded"></box-icon>
        </div>
      </div>

      <div className="chatroom-body">
        {messages.map((message) => (
          <div key={message._id} className="message">
            <div className="message-content">{message.content}</div>
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

export default Chatroom;
