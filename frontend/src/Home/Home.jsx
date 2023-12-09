import { useState } from "react";
import { Login } from "./Login";
import { Register } from "./Register";
import "react-toastify/dist/ReactToastify.css";

export const URL = "//swiftsync.fly.dev";

export function Home() {
  const [currentForm, setCurrentForm] = useState("auth");

  const renderContent = () => {
    switch (currentForm) {
      case "auth":
        return <Login setCurrentForm={setCurrentForm}></Login>;
      case "reg":
        return <Register setCurrentForm={setCurrentForm}></Register>;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-1 min-h-full flex-col justify-center px-6 py-12 h-screen bg-zinc-800">
      <div className="flex items-center justify-center sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-3xl font-bold text-white transition-opacity">
          {currentForm == "reg"
            ? "Sign up for SwiftSync"
            : "Login to SwiftSync"}
        </h1>
      </div>
      <div>{renderContent()}</div>
    </div>
  );
}
