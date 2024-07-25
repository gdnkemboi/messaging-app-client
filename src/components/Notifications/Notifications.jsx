import { useEffect, useState } from "react";
import { Navigate, useNavigate, useOutletContext } from "react-router-dom";

const Notifications = () => {
  const [token] = useOutletContext();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/notifications",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("An error occured");
        }

        const data = await response.json();
        setNotifications(data.notifications);
        setLoading(false);
      } catch (err) {
        setError(err);
      }
    };

    fetchNotifications();
  }, []);

  const handleMarkAllAsRead = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/notifications/read",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("An error occured");
      }

      setNotifications([]);
      navigate("/notifications");
    } catch (err) {
      setError(err);
    }
  };

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
    <div className="notifications-container">
      <div className="notifs-header">
        <h3>Notifications</h3>
        <button className="btn" onClick={handleMarkAllAsRead}>
          Mark all as Read
        </button>
      </div>
      <div className="notifications">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div key={notification._id} className="notification">
              {notification.content}
            </div>
          ))
        ) : (
          <div>No new notifications.</div>
        )}
      </div>
    </div>
  );
};

export default Notifications;