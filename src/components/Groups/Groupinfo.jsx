import { useContext } from "react";
import { GroupContext } from "./Groups";
import "boxicons";
import { useNavigate } from "react-router-dom";

function Groupinfo() {
  const {
    activeGroup,
    user,
    token,
    setActiveGroup,
    setGroups,
    setViewGroupInfo,
  } = useContext(GroupContext);
  const navigate = useNavigate();

  function isUserAdmin(group, userId) {
    return group.admin.includes(userId);
  }

  const handleLeaveGroup = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/groups/${activeGroup._id}/leave`,
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
        console.log(`${activeGroup.name} left successfully`);
        const data = await response.json();
        setGroups(data.groups);
        setActiveGroup(null);
        navigate("/groups");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="group-information">
      <div className="group-information-header">
        <div className="close-container">
          <box-icon name="x" onClick={() => setViewGroupInfo(false)}></box-icon>
          <p>Group info</p>
        </div>
        <div className="group-details">
          <div className="group-icon-container">
            <img
              src={activeGroup.groupIcon}
              alt={`${activeGroup.name}'s profile`}
              className="group-icon"
            />
            <div className="group-name">{activeGroup.name}</div>
            <div className="group-members-count">
              <span>Group&bull;</span>
              <span>
                {activeGroup.members.length}
                {activeGroup.members.length > 1 ? "members" : "member"}
              </span>
            </div>
          </div>
          <div className="group-description-container">
            <div>Description</div>
            <div className="group-description">{activeGroup.description}</div>
          </div>
        </div>
      </div>
      <div className="group-members-container">
        <div className="add-members-container">
          <div>
            {activeGroup.members.length}
            {activeGroup.members.length > 1 ? " members" : " member"}
          </div>
          {isUserAdmin(activeGroup, user._id) && (
            <button className="add-members-button">+Add</button>
          )}
        </div>

        {activeGroup.members.map((member) => {
          return (
            <div key={member._id} className="group-member">
              <img
                src={member.profilePicture}
                alt={`${member.username}'s profile`}
                className="profile-picture"
              />
              <div className="member-info">
                <div className="username">{member.username}</div>
                <div className="about">{member.about}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="group-actions">
        <div className="leave-group" onClick={handleLeaveGroup}>
          <box-icon name="exit"></box-icon>
          <p>Leave group</p>
        </div>
        <div className="report-group">
          <box-icon name="dislike"></box-icon>
          <p>Report group</p>
        </div>
      </div>
    </div>
  );
}

export default Groupinfo;
