import React from "react";
import { Routes, Route } from "react-router-dom";
import { App } from "./Chat/App.jsx";
import { LoginRoom } from "./Login/LoginRoom.jsx";
import { Private } from "./PrivateChat/Private.jsx";
import { NotFound } from "./NotFound.jsx";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LoginRoom />} />
      <Route path="/ss" element={<App />} />
      <Route path="/private/:privateRoom/:username/:id" element={<Private />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
