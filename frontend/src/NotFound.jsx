import React from "react";

export function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <h1 className="text-6xl mb-3">404 Not Found</h1>
        <a href="/">Go back to Home</a>
      </div>
    </div>
  );
}
