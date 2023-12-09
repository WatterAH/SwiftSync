import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faGear,
  faRightFromBracket,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { socket } from "../Home/Login";
import { useNavigate } from "react-router-dom";
import { URL } from "../Home/Home";
import { profile } from "./Search";
import { displayFriends } from "../Chat/Actions";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function Dropdown() {
  const nav = useNavigate();

  const logout = async () => {
    try {
      const res = await fetch(`${URL}/api/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (res.status == 200) {
        socket.disconnect();
        nav("/");
      }
    } catch (error) {
      socket.disconnect();
      nav("/");
      throw new Error(error);
    }
  };

  return (
    <Menu as="div" className="relative text-left inline-block">
      <div>
        <Menu.Button className="inline-flex w-full justify-center">
          <FontAwesomeIcon
            icon={faGear}
            className="text-amber-200"
          ></FontAwesomeIcon>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  onClick={() => profile(socket.id_user)}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm hover:cursor-pointer"
                  )}
                >
                  <FontAwesomeIcon
                    icon={faAddressCard}
                    className="mr-3"
                  ></FontAwesomeIcon>
                  My profile
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm hover:cursor-pointer"
                  )}
                  onClick={displayFriends}
                >
                  <FontAwesomeIcon
                    icon={faUserGroup}
                    className="mr-3"
                  ></FontAwesomeIcon>
                  My SwiftFriends
                </a>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  onClick={logout}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm hover:cursor-pointer"
                  )}
                >
                  <FontAwesomeIcon
                    icon={faRightFromBracket}
                    className="mr-3"
                  ></FontAwesomeIcon>
                  Logout
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
