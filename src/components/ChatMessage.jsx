import React from "react";
import { USER_LOGO_URL } from "../utils/constants";

const ChatMessage = ({ name, message }) => {

  return (
    <div>
      <div className="flex items-start space-x-2 p-1 rounded-md bg-white shadow-md mb-1">
        {/* User Avatar */}
        <img className="h-8 w-8 rounded-full" src={USER_LOGO_URL} alt="User" />

        {/* Message Content */}
        <div className="flex flex-col">
          <p className="text-sm font-semibold text-black">{name}</p>
          <p className="text-sm text-black break-words pl-2">{message}😶</p>
        </div>
          </div>
    </div>
  );
};

export default ChatMessage;
