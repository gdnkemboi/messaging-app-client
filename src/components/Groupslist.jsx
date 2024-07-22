import "boxicons";
import { useContext } from "react";
import { GroupContext } from "./Groups";

function decodeHTMLEntities(text) {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
}

function Groupslist() {
  const { groups, setActiveGroup } = useContext(GroupContext);

  if (groups.length === 0) {
    return (
      <div>
        <h3>ALL GROUPS</h3>
        <p>No groups available.</p>
      </div>
    );
  }

  return (
    <div className="groups">
      <h3>ALL GROUPS</h3>
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
                  <span className="group-name">{group.name}</span>
                  {group.lastMessageId && (
                    <span className="timestamp">
                      {new Date(
                        group.lastMessageId.timestamp
                      ).toLocaleTimeString()}
                    </span>
                  )}
                </div>
                {group.lastMessageId && (
                  <div className="last-message">
                    <span className="last-message-sender">
                      {group.lastMessageSenderId.username}:
                    </span>
                    <span className="last-message-content">
                      {decodeHTMLEntities(group.lastMessageId.content)}
                    </span>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Groupslist;
