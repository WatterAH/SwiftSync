import React from "react";
import { OptionsRequest } from "./OptionsRequest";
import { profile } from "./Search";

export const Notification = ({ notification, setForceUpdate }) => {
  return (
    <div className="border-b border-gray-500 p-5 flex justify-between text-xs sm:text-base">
      <p className="mr-4">
        <span
          onClick={() => profile(notification.req)}
          className="hover:cursor-pointer hover:underline"
        >
          {notification.from}
        </span>{" "}
        {notification.message}
      </p>
      <OptionsRequest
        requester={notification.req}
        responser={notification.res}
      ></OptionsRequest>
    </div>
  );
};
