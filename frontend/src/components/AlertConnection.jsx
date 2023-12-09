import React from "react";

export const AlertConnection = ({ message }) => {
  return message.from == "Connection" ? (
    <div className="flex items-center justify-center">
      <p>
        {message.body} has
        <span className="text-emerald-500"> connected</span>
      </p>
    </div>
  ) : (
    <div className="flex items-center justify-center">
      <p>
        {message.body} has
        <span className="text-red-600"> disconnected</span>
      </p>
    </div>
  );
};
