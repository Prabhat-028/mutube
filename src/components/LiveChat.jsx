import React, { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { addMessages } from "../utils/chatSlice";
import { generate } from "../utils/helper";
const LiveChat = () => {
  const dispatch = useDispatch();
  const chatMessage = useSelector((store) => store.chat.messages);
  const [liveMessage, setLiveMessage] = useState("");

  useEffect(() => {
    const i = setInterval(() => {
      dispatch(
        addMessages({
          name: generate(),
          message: "This is live chat proto ❤️",
        })
      );
    }, 2000);

    return () => clearInterval(i);
  }, [dispatch]);

  return (
    <div>
      <div className="w-1/3 h-[600px] ml-2 mt-4 p-2 mr-4 border border-zinc-500 bg-slate-50 rounded-lg overflow-y-auto flex flex-col-reverse">
        <div>
          {chatMessage.map((m, index) => (
            <ChatMessage key={index} name={m.name} message={m.message} />
          ))}
        </div>
      </div>
      <form
        className="p-2 border border-black"
        action="#"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(
            addMessages({
              name: "Prabhat Singh",
              message: liveMessage,
            })
          );
        }}
      >
        <input
          type="text"
          placeholder="write here to chat"
          value={liveMessage}
          onChange={(e) => {
            setLiveMessage(e.target.value);
          }}
        />
        <button
          className="bg-gray-950 p-2 m-2 text-white focus:bg-white focus:text-black rounded-lg"
          onClick={dispatch(
            addMessages({
              name: "Prabhat Singh",
              message: liveMessage,
            })
          )}
        >
          send
        </button>
      </form>
    </div>
  );
};

export default LiveChat;
