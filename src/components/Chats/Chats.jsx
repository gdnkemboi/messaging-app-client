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
  fetchChats: () => {},
  apiURL: "",
});

function Chats() {
  const { token, user, apiURL } = useOutletContext();
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [viewChatInfo, setViewChatInfo] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchChats = async () => {
    try {
      const response = await fetch(`${apiURL}/chats`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("An error occured!");
      }

      const data = await response.json();
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
          fetchChats,
          apiURL,
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
