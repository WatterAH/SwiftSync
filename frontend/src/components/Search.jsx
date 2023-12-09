import { useEffect, useState } from "react";
import { URL } from "../Home/Home";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getFa } from "../containers/GlobalList";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export let profile;

export const Search = ({ setCurrentTab, setUserId }) => {
  const [username, setUsername] = useState("");
  const [usersFound, setUsersFound] = useState([]);
  const [displayResults, setDisplayResults] = useState(false);

  useEffect(() => {
    const closeResults = (e) => {
      if (!e.target.closest(".search-container")) {
        setUsersFound([]);
        setDisplayResults(false);
      }
    };

    document.body.addEventListener("click", closeResults);

    return () => {
      document.body.removeEventListener("click", closeResults);
    };
  }, []);

  const searchFor = async (e) => {
    const input = e.target.value;
    setUsername(e.target.value);

    if (input.trim() === "") {
      setUsersFound([]);
      setDisplayResults(false);
      return;
    }

    try {
      const res = await fetch(
        `${URL}/api/searchFriend?username=${encodeURIComponent(username)}`
      );
      const resData = await res.json();
      if (!res.ok) {
        toast.error(resData.message, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        setDisplayResults(false);
      } else {
        setDisplayResults(true);
        setUsersFound(resData);
      }
    } catch (error) {
      setDisplayResults(false);
      toast.error("Client Error", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  profile = (id) => {
    setCurrentTab("profile");
    setUserId(id);
    setDisplayResults(false);
    setUsername("");
  };

  return (
    <div className="search-container flex justify-center px-2 py-4">
      <div className="w-2/3">
        <div className="flex items-center">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="mr-5"
          ></FontAwesomeIcon>
          <input
            className="h-7 w-full p-4 rounded-lg text-black"
            type="text"
            placeholder="Search for friends"
            onChange={searchFor}
            value={username}
          />
        </div>
        {displayResults && usersFound.length > 0 && (
          <div className="bg-zinc-900 rounded-lg mt-4 p-3 absolute">
            <ul className="flex-1 overflow-y-auto">
              {usersFound.map((user) => (
                <li key={user.id} className="p-3 border-b border-gray-600">
                  <button onClick={() => profile(user.id)}>
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
