import { socket } from "../Home/Login.jsx";
import { useState, useEffect } from "react";
import { GlobalList } from "../containers/GlobalList.jsx";
import { Menu } from "../containers/Menu.jsx";
import { Search } from "../components/Search.jsx";
import { Profile } from "../containers/Profile.jsx";
import { Notifications } from "../containers/Notifications.jsx";
import { SwiftFriends } from "../containers/SwiftFriends.jsx";

export let displayFriends;

export const Actions = ({ visible }) => {
  const [users, setUsers] = useState([]);
  const [currentTab, setCurrentTab] = useState("global");
  const [userId, setUserId] = useState("");

  const renderContent = () => {
    switch (currentTab) {
      case "global":
        return <GlobalList users={users}></GlobalList>;
      case "chats":
        return <p className="p-4">Coming soon</p>;
      case "notifications":
        return <Notifications></Notifications>;
      case "profile":
        return <Profile id={userId}></Profile>;
      case "friends":
        return <SwiftFriends></SwiftFriends>;
      default:
        break;
    }
  };

  displayFriends = () => {
    setCurrentTab("friends");
  };

  useEffect(() => {
    socket.on("userConnected", (users) => {
      setUsers(users);
    });

    return () => {
      socket.off("userConnected");
    };
  }, []);

  return (
    <div
      className={`actions-container h-screen ${
        !visible ? "w-4/5 md:w-3/5 lg:w-1/3" : "lg:w-1/3"
      } bg-zinc-800 flex flex-col z-10 rounded-md`}
    >
      <Search setCurrentTab={setCurrentTab} setUserId={setUserId}></Search>
      <Menu
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        setUserId={setUserId}
      ></Menu>
      {renderContent()}
    </div>
  );
};
