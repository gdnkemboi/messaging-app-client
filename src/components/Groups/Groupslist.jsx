import "boxicons";
import { useContext, useState, useEffect } from "react";
import { GroupContext } from "./Groups";
import Modal from "../Common/Modal";
import Input from "../Common/Input";

function decodeHTMLEntities(text) {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
}

function Groupslist() {
  const { groups, setActiveGroup, token, fetchGroups } =
    useContext(GroupContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  const handleCreateGroup = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/groups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, description }),
      });

      if (!response.ok) {
        throw new Error("An error occurred!");
      }

      const data = await response.json();
      // Update the group list and set the active group with the newly created group
      setActiveGroup(data.group);
      fetchGroups();
      setIsModalOpen(false);
      setName("");
      setDescription("");
    } catch (err) {
      setError(err);
    }
  };

  if (groups.length === 0) {
    return (
      <div>
        <h3>ALL GROUPS</h3>
        <p>No groups available.</p>
      </div>
    );
  }

  return (
    <div className="groups-list">
      <p>ALL GROUPS</p>
      <ul>
        {groups.map((group) => {
          return (
            <li
              key={group._id}
              className="group-item"
              onClick={() => setActiveGroup(group)}
            >
              <img
                src={group.groupIcon}
                alt={`${group.name} icon`}
                className="group-icon"
              />
              <div className="group-info">
                <div className="group-header">
                  <div className="group-name">{group.name}</div>
                  {group.lastMessageId && (
                    <div className="last-message">
                      {`${group.lastMessageSenderId.username}:
                      ${decodeHTMLEntities(group.lastMessageId.content)}`}
                    </div>
                  )}
                </div>
                {group.lastMessageId && (
                  <div className="timestamp">
                    {new Date(group.lastMessageId.timestamp).toLocaleTimeString(
                      "en-US",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      }
                    )}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      <div className="create-group" onClick={handleCreateGroup}>
        <box-icon name="message-alt-add"></box-icon>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Group"
      >
        <form className="create-group-form" onSubmit={handleSubmit}>
          <div className="input-box">
            <Input
              type="text"
              placeholder="Group Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input-box">
            <Input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button type="submit" className="btn">Create Group</button>
        </form>
      </Modal>
    </div>
  );
}

export default Groupslist;
