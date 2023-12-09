import React, { useEffect, useState } from "react";
import loadingGif from "../assets/loading.gif";
import { URL } from "../Home/Home";
import { socket } from "../Home/Login";
import { ToastContainer, toast } from "react-toastify";
import { EmptyFriends } from "../components/Empty/EmptyFriends";
import { Friend } from "../components/Friend";

export let deleteFriendFromSF;

export const SwiftFriends = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);

  const getFriends = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${URL}/api/getFriends?id=${encodeURIComponent(socket.id_user)}`
      );
      const resData = await res.json();
      if (!res.ok) {
        toast.error(resData.message, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      } else {
        setFriends(resData);
      }
    } catch (error) {
      toast.error("Client Error", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } finally {
      setLoading(false);
    }
  };

  deleteFriendFromSF = (id) => {
    const newFriends = friends.filter((friend) => friend.friend_id != id);
    setFriends(newFriends);
  };

  useEffect(() => {
    getFriends();
  }, []);

  return (
    <div className="p-4">
      {loading ? (
        <img src={loadingGif} alt="loading" className="w-10 h-10 m-auto" />
      ) : (
        <div>
          {friends.length === 0 ? (
            <EmptyFriends></EmptyFriends>
          ) : (
            friends.map((friend, index) => (
              <Friend key={index} friend={friend}></Friend>
            ))
          )}
        </div>
      )}
      <ToastContainer></ToastContainer>
    </div>
  );
};
