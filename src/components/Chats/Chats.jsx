import { createContext, useEffect, useState } from "react";
import Chatslist from "./Chatslist";
import Chatroom from "./Chatroom";
import Chatinfo from "./Chatinfo";
import { useOutletContext } from "react-router-dom";
import "/src/styles/Chats.css";

export const ChatContext = createContext({
  token: "",
  chats: [],
  setChats: () => {},
  activeChat: {},
  setActiveChat: () => {},
  user: {},
  setViewChatInfo: () => {},
});

function Chats() {
  const [token, user] = useOutletContext();
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [viewChatInfo, setViewChatInfo] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchChats = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/chats", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("An error occured!");
      }

      const data = await response.json();
      console.log(data);
      setChats(data.chats);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChats();
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

  console.log(activeChat);

  return (
    <div className="chats-container">
      <ChatContext.Provider
        value={{
          token,
          chats,
          setChats,
          activeChat,
          setActiveChat,
          user,
          setViewChatInfo,
        }}
      >
        <div className="chats">
          <Chatslist />
          {activeChat && <Chatroom />}
          {viewChatInfo && <Chatinfo />}
        </div>
      </ChatContext.Provider>
    </div>
  );
}

export default Chats;
