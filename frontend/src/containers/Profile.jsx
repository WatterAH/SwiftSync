import { useEffect, useState } from "react";
import { URL } from "../Home/Home";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import loadingGif from "../assets/loading.gif";
import { socket } from "../Home/Login";
import { faUserClock, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { OptionsRequest } from "../components/OptionsRequest";
import { getFa } from "./GlobalList";
import { DeleteFriend } from "../components/DeleteFriend";

export let deleteFriend;
export let cancelFromProfile;

export const Profile = ({ id }) => {
  const [userData, setUserData] = useState({});
  const [userId, setUserId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isRequested, setIsRequested] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(false);

  cancelFromProfile = () => {
    setIsFriend(false);
    setIsRequested(false);
  };

  deleteFriend = async (id) => {
    try {
      const body = {
        id,
        me: socket.id_user,
      };
      cancelFromProfile();
      const res = await fetch(`${URL}/api/deleteFriendById`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body),
      });
      const resData = await res.json();
      if (!res.ok) {
        toast.error(resData.message, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    } catch (error) {
      toast.error("Client Error", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  const searchProfile = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${URL}/api/searchProfileById?id=${encodeURIComponent(
          id
        )}&me=${encodeURIComponent(socket.id_user)}`
      );
      const resData = await res.json();
      if (!res.ok) {
        toast.error(resData.message, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      } else {
        setUserData(resData);
        setUserId(resData.id);
        setIsFriend(resData.isFriend);
        setIsRequested(resData.sentFriendRequest);
      }
    } catch (error) {
      toast.error("Client Error", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchProfile();
  }, [id, forceUpdate]);

  const cancelRequest = async (id) => {
    setIsRequested(false);
    try {
      const data = {
        id: id,
        me: socket.id_user,
      };
      await fetch(`${URL}/api/cancelFriendRequest`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
    } catch (error) {
      toast.error("Client Error", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  const sendRequest = async (id) => {
    setIsRequested(true);
    try {
      const data = {
        friendRequesterName: socket.username,
        friendRequesterId: socket.id_user,
        friendResponserId: id,
      };
      await fetch(`${URL}/api/sendFriendRequest`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
    } catch (error) {
      toast.error("Client Error", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  return (
    <div className="p-4">
      {loading ? (
        <img src={loadingGif} alt="loading" className="w-10 h-10 m-auto" />
      ) : userId !== 0 ? (
        <div>
          <section className="flex items-center mb-7">
            <FontAwesomeIcon
              className="w-20 h-20 object-cover text-emerald-300 mr-5"
              icon={getFa(userData.icon)}
            ></FontAwesomeIcon>
            <h2 className="text-4xl">{userData.username}</h2>
            <div className="ml-5">
              {socket.id_user !== userData.id ? (
                isFriend ? (
                  <DeleteFriend id={userData.id}></DeleteFriend>
                ) : userData.receivedFriendRequest ? (
                  <OptionsRequest
                    setForceUpdate={setForceUpdate}
                    requester={userData.id}
                    responser={socket.id_user}
                  ></OptionsRequest>
                ) : (
                  <button
                    onClick={() => {
                      if (isRequested) {
                        cancelRequest(userData.id);
                      } else {
                        sendRequest(userData.id);
                      }
                    }}
                  >
                    <FontAwesomeIcon
                      icon={isRequested ? faUserClock : faUserPlus}
                      className={`w-10 h-10 ${
                        isRequested
                          ? "hover:text-red-400"
                          : "hover:text-emerald-400"
                      }`}
                    ></FontAwesomeIcon>
                  </button>
                )
              ) : (
                ""
              )}
            </div>
          </section>
          <section className="flex items-center">
            <p className="italic">No such description.</p>
          </section>
        </div>
      ) : (
        <div></div>
      )}
      <ToastContainer></ToastContainer>
    </div>
  );
};
