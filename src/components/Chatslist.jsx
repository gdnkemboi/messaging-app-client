import "boxicons";
import { useContext } from "react";
import { ChatContext } from "./Chats";

function Chatslist() {
  const { chats, setActiveChat, user } = useContext(ChatContext);

  if (chats.length === 0) {
    return (
      <div>
        <h3>ALL CHATS</h3>
        <p>No chats available.</p>
      </div>
    );
  }

  return (
    <div className="chats">
      <h3>ALL CHATS</h3>
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
                  <span className="username">{otherParticipant.username}</span>
                  <span className="timestamp">
                    {new Date(
                      chat.lastMessageId.timestamp
                    ).toLocaleTimeString()}
                  </span>
                </div>
                <div className="last-message">{chat.lastMessageId.content}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Chatslist;
