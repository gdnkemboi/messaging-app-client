import { createContext, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Groupslist from "./Groupslist";
import Groupchat from "./Groupchat";
import Groupinfo from "./Groupinfo";
import "/src/styles/Groups.css";

export const GroupContext = createContext({
  token: "",
  groups: [],
  setGroups: () => {},
  activeGroup: {},
  setActiveGroup: () => {},
  user: {},
  setViewGroupInfo: () => {},
  fetchGroups: () => {},
});

const Groups = () => {
  const [token, user] = useOutletContext();
  const [groups, setGroups] = useState([]);
  const [activeGroup, setActiveGroup] = useState(null);
  const [viewGroupInfo, setViewGroupInfo] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGroups = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/groups", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("An error occured!");
      }

      const data = await response.json();
      setGroups(data.groups);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
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
    <div className="groups-container">
      <div className="groups">
        <GroupContext.Provider
          value={{
            token,
            groups,
            setGroups,
            activeGroup,
            setActiveGroup,
            user,
            setViewGroupInfo,
            fetchGroups,
          }}
        >
          <Groupslist />
          {activeGroup && <Groupchat />}
          {viewGroupInfo && <Groupinfo />}
        </GroupContext.Provider>
      </div>
    </div>
  );
};

export default Groups;
