import { useContext } from "react";
import { ChatContext } from "./Chats";
import "boxicons";
import { useNavigate } from "react-router-dom";

function Chatinfo() {
  const { activeChat, user, token, setActiveChat, setChats, setViewChatInfo } =
    useContext(ChatContext);
  const otherParticipant = activeChat.participants.find(
    (participant) => participant._id !== user._id
  );
  const navigate = useNavigate();

  const handleBlockUser = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/contacts/${otherParticipant._id}/block`,
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
        console.log(`${otherParticipant.username} blocked successfully`);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleDeleteChat = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/chats/${activeChat._id}`,
        {
          method: "DELETE", // Use DELETE method to delete a chat
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
        console.log(
          `Chat with ${otherParticipant.username} deleted successfully`
        );
        const data = await response.json();
        setChats(data.chats);
        setActiveChat(null);
        navigate("/");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="chat-information">
      <div className="chat-information-header">
        <div className="close-container">
          <box-icon name="x" onClick={() => setViewChatInfo(false)}></box-icon>
          <p>Contact info</p>
        </div>
      </div>
      <div className="chat-details">
        <div className="profile-pic-container">
          <img
            src={otherParticipant.profilePicture}
            alt={`${otherParticipant.username}'s profile`}
            className="profile-picture"
          />

          <div className="username">{otherParticipant.username}</div>
          <div className="status">{otherParticipant.status}</div>
        </div>
        <p>About</p>
        <p className="about">{otherParticipant.about}</p>
      </div>
      <div className="chat-actions">
        <div className="block-user" onClick={handleBlockUser}>
          <box-icon name="block"></box-icon>
          <p>{`Block ${otherParticipant.username}`}</p>
        </div>
        <div className="report-user">
          <box-icon name="dislike"></box-icon>
          <p>{`Report ${otherParticipant.username}`}</p>
        </div>
        <div className="delete-chat" onClick={handleDeleteChat}>
          <box-icon name="trash"></box-icon>
          <p>Delete chat</p>
        </div>
      </div>
    </div>
  );
}

export default Chatinfo;
