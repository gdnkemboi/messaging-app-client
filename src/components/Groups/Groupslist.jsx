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
    </div>
  );
}

export default Groupslist;
