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
      <div className="w-1/3 h-[600px] ml-2 mt-2 p-2 mr-4 ">
        <div className=" ml-2 h-[550px] mt-4 p-2 border border-zinc-500 bg-slate-50 rounded-lg  flex flex-col-reverse overflow-y-auto">
          {chatMessage.map((m, index) => (
            <ChatMessage key={index} name={m.name} message={m.message} />
          ))}
        </div>

        <form
          className="p-2 border border-black rounded-xl"
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(
              addMessages({
                name: "Prabhat Singh",
                message: liveMessage,
              })
            );
            setLiveMessage(""); // clear input after sending
          }}
        >
          <input
            type="text"
            placeholder="write here to chat"
            value={liveMessage}
            onChange={(e) => setLiveMessage(e.target.value)}
          />
          <button
            type="submit"
            className="bg-gray-950 p-2 m-2 text-white focus:bg-white focus:text-black rounded-lg"
            onClick={() =>
              dispatch(
                addMessages({
                  name: "Prabhat Singh",
                  message: liveMessage,
                })
              )
            }
          >
            send
          </button>
        </form>
      </div>
    );
};

export default LiveChat;
