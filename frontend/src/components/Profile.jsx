import { useEffect, useId, useState } from "react";
import { URL } from "../Home/Home";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getFa } from "./GlobalList";
import loadingGif from "../assets/loading.gif";

export const Profile = ({ id }) => {
  const [username, setUsername] = useState("");
  const [userIcon, setUserIcon] = useState(1);
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
  }, []);

  return (
    <div className="p-4">
      {loading ? (
        <img src={loadingGif} alt="loading" className="w-10 h-10 m-auto" />
      ) : (
        <div>
          <div className="flex items-center mb-7">
            <FontAwesomeIcon
              className="w-20 h-20 object-cover text-amber-200 mr-5"
              icon={getFa(userIcon)}
            ></FontAwesomeIcon>
            <h2 className="text-5xl">{username}</h2>
          </div>
          <button className="bg-green-300 p-2 rounded-md text-black">
            Add friend
          </button>
        </div>
      )}
      <ToastContainer></ToastContainer>
    </div>
  );
};
