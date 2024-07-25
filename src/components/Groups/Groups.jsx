import { createContext, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Groupslist from "./Groupslist";
import Groupchat from "./Groupchat";
import Groupinfo from "./Groupinfo";

export const GroupContext = createContext({
  token: "",
  groups: [],
  setGroups: () => {},
  activeGroup: {},
  setActiveGroup: () => {},
  user: {},
});

const Groups = () => {
  const [token, user] = useOutletContext();
  const [groups, setGroups] = useState([]);
  const [activeGroup, setActiveGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
        console.log(data);
        setGroups(data.groups);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

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

  console.log(activeGroup);

  return (
    <div className="groups-container">
      <GroupContext.Provider
        value={{ token, groups, setGroups, activeGroup, setActiveGroup, user }}
      >
        <Groupslist />
        {activeGroup && <Groupchat />}
        {activeGroup && <Groupinfo />}
      </GroupContext.Provider>
    </div>
  );
};

export default Groups;
