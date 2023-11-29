import { useEffect, useId, useState } from "react";
import { URL } from "../Home/Home";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getFa } from "./GlobalList";
import loadingGif from "../assets/loading.gif";
import { socket } from "../Home/Login";
import { faPenToSquare, faUserPlus } from "@fortawesome/free-solid-svg-icons";

export const Profile = ({ id }) => {
  const [username, setUsername] = useState("");
  const [userIcon, setUserIcon] = useState(-1);
  const [userId, setUserId] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searchProfile = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${URL}/api/searchProfile?id=${encodeURIComponent(id)}`
        );
        const response = await res.json();
        if (res.status != 200) {
          toast.error(response.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        } else {
          setUserId(response.id);
          setUsername(response.username);
          setUserIcon(response.icon);
        }
      } catch (error) {
        toast.error(error, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      } finally {
        setLoading(false);
      }
    };
    searchProfile();
  }, [id]);

  const addUser = (id) => {
    try {
      const data = {
        myName: socket.username,
        myID: socket.id_user,
        theirID: id,
      };
      socket.emit("addUser", data);
    } catch (error) {
      toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  return (
    <div className="p-4">
      {loading ? (
        <img src={loadingGif} alt="loading" className="w-10 h-10 m-auto" />
      ) : (
        <div>
          <section className="flex items-center mb-7">
            <FontAwesomeIcon
              className="w-20 h-20 object-cover text-amber-200 mr-5"
              icon={getFa(userIcon)}
            ></FontAwesomeIcon>
            <h2 className="text-4xl">{username}</h2>
            <div className="ml-5">
              {socket.id_user != userId && userId != 0 ? (
                <button onClick={() => addUser(userId)}>
                  <FontAwesomeIcon
                    icon={faUserPlus}
                    className="w-10 h-10 hover:text-emerald-300"
                  ></FontAwesomeIcon>
                </button>
              ) : (
                <button>
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    className="w-10 h-10"
                  ></FontAwesomeIcon>
                </button>
              )}
            </div>
          </section>
          <section className="flex items-center">
            <p className="italic">No such description.</p>
          </section>
        </div>
      )}
      <ToastContainer></ToastContainer>
    </div>
  );
};
