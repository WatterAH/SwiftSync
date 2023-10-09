import React from "react";

export const Tooltip = ({ text, children, ty }) => {
  return (
    <div className="relative group">
      {children}
      <div className="invisible opacity-0 bg-slate-600 text-white text-xs text-center whitespace-nowrap py-2 px-4 rounded absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 translate-y-2 group-hover:visible group-hover:opacity-100 transition duration-300">
        {text}
      </div>
    </div>
  );
};
