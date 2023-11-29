import { useState } from "react";
import { URL } from "../Home/Home";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getFa } from "./GlobalList";

export const Search = ({ setCurrentTab, setUserId }) => {
  const [username, setUsername] = useState("");
  const [usersFound, setUsersFound] = useState([]);
  const [displayResults, setDisplayResults] = useState(false);

  const searchFor = async (e) => {
    setUsername(e.target.value);
    try {
      const res = await fetch(
        `${URL}/api/searchFriend?username=${encodeURIComponent(username)}`
      );
      const response = await res.json();
      if (res.status != 200) {
        toast.error(response.message, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        setDisplayResults(false);
      } else {
        setDisplayResults(true);
        setUsersFound(response);
      }
    } catch (error) {
      setDisplayResults(false);
      toast.error(response.message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  return (
    <div className="flex justify-center px-2 py-4">
      <div className="w-2/3">
        <input
          className="h-7 w-full p-4 rounded-lg text-black"
          type="text"
          placeholder="Search for friends"
          onChange={searchFor}
          value={username}
        />
        {displayResults && usersFound.length > 0 && (
          <div className="bg-zinc-900 rounded-lg mt-4 p-3 absolute">
            <ul className="flex-1 overflow-y-auto">
              {usersFound.map((user) => (
                <li key={user.id} className="p-3 border-b border-gray-600">
                  <button
                    onClick={() => {
                      setCurrentTab("profile");
                      setUserId(user.id);
                      setDisplayResults(false);
                    }}
                  >
                    <div className="flex items-center">
                      <div className="w-5 h-5 mr-2 object-cover text-amber-200">
                        <FontAwesomeIcon
                          icon={getFa(user.icon)}
                        ></FontAwesomeIcon>
                      </div>
                      {user.username}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};
