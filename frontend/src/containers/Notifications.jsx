import React, { useEffect, useState } from "react";
import { URL } from "../Home/Home";
import { socket } from "../Home/Login";
import loadingGif from "../assets/loading.gif";
import { ToastContainer, toast } from "react-toastify";
import { Notification } from "../components/Notification";
import { EmptyNotifications } from "../components/Empty/EmptyNotifications";

export let deleteNotification;

export const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [forceUpdate, setForceUpdate] = useState(false);

  const getNotifications = async () => {
    try {
      setLoading(true);
      const id = socket.id_user;
      const res = await fetch(
        `${URL}/api/getNotifications?id=${encodeURIComponent(id)}`
      );
      const resData = await res.json();
      setNotifications(resData);
    } catch (error) {
      toast.error("Client Error", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } finally {
      setLoading(false);
    }
  };

  deleteNotification = (id) => {
    const newNotifications = notifications.filter(
      (notification) => notification.req != id
    );
    setNotifications(newNotifications);
  };

  useEffect(() => {
    getNotifications();
  }, [forceUpdate]);

  return (
    <div className="p-4">
      {loading ? (
        <img src={loadingGif} alt="loading" className="w-10 h-10 m-auto" />
      ) : (
        <div>
          {notifications.length === 0 ? (
            <EmptyNotifications></EmptyNotifications>
          ) : (
            notifications.map((notification, index) => (
              <Notification
                key={index}
                notification={notification}
                setForceUpdate={setForceUpdate}
              ></Notification>
            ))
          )}
        </div>
      )}
      <ToastContainer></ToastContainer>
    </div>
  );
};
