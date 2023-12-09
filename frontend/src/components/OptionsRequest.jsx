import { faUserMinus, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { URL } from "../Home/Home";
import { ToastContainer, toast } from "react-toastify";
import { deleteNotification } from "../containers/Notifications";

export const OptionsRequest = ({ requester, responser, setForceUpdate }) => {
  const accept = async (id, me) => {
    try {
      const body = {
        id,
        me,
      };
      if (deleteNotification) {
        deleteNotification(id);
      }
      const res = await fetch(`${URL}/api/acceptFriendRequest`, {
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
      } else {
        if (setForceUpdate) {
          setForceUpdate(true);
        }
      }
    } catch (error) {
      toast.error("Client Error", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  const decline = async (id, me) => {
    try {
      const body = {
        id: id,
        me: me,
      };
      if (deleteNotification) {
        deleteNotification(id);
      }
      const res = await fetch(`${URL}/api/declineFriendRequest`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        toast.error("There was an error", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      } else {
        if (setForceUpdate) {
          setForceUpdate(true);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("There was an error", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
  return (
    <div>
      <button onClick={() => accept(requester, responser)}>
        <FontAwesomeIcon icon={faUserPlus} className="text-emerald-400 mr-4" />
      </button>
      <button onClick={() => decline(requester, responser)}>
        <FontAwesomeIcon icon={faUserMinus} className="text-red-400" />
      </button>
      <ToastContainer></ToastContainer>
    </div>
  );
};
