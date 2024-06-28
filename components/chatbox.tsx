"use client";
import Image from "next/image";
import profile from "@/public/profile.svg";
import Dots from "@/public/dots.svg";
import "@/styles/chatbox.css";
import useSocket from "@/client/usesocket";

import { useEffect, useState } from "react";
import Box from "@/components/box";

interface message {
  msg: string;
  whosend: boolean;
}

function Mainchat() {
  const socket = useSocket();
  const [messages, setmessages] = useState<message[]>([]);

  function sendto(recpientid: string | undefined, msg: string) {
    socket?.emit("private message", {
      to: recpientid,
      from: socket?.id,
      message: msg,
    });
    const chat: message = {
      msg: msg,
      whosend: true,
    };
    setmessages((prevmsg) => [...prevmsg, chat]);
  }

  useEffect(() => {
    socket?.on("recieve message", ({ from, message }) => {
      console.log(`message recieved from ${from}:${message}`);
      const rec: message = {
        msg: message,
        whosend: false,
      };
      setmessages((prevmsg) => [...prevmsg, rec]);
    });
  }, [socket]);
  return (
    <div className="container flex h-full w-full flex-col">
      {/* title box */}
      <div className="titlebox">
        <div className="ml-5 flex cursor-pointer flex-row space-x-2 p-2">
          <div>
            <Image
              src={profile}
              alt="failed"
              className="rounded-full"
              width={50}
              height={50}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <span>username</span>
            <span>status</span>
          </div>
        </div>
        <div className="mr-2">
          <button>
            <Image src={Dots} alt="failed" />
          </button>
        </div>
      </div>

      <div className="scrollbox container overflow-y-auto">
        {/* msg box */}
        {messages.map((message) => (
          <Box key="1" checkwho={message.whosend}></Box>
        ))}
      </div>
      {/* message box */}
      <div className="fixed bottom-0 mt-3 flex w-3/4 flex-row items-center justify-between">
        <input type="text" placeholder="Type Message..." className="inputbox" />
        <div className="flex">
          <button
            type="button"
            className="sendmsg flex flex-row items-center justify-center"
            onClick={() => sendto(socket?.id, "hello buddy")}
          >
            Send
            <svg
              width="25"
              height="26"
              viewBox="0 0 25 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.526 4.02674L3.05729 11.4335C1.79687 11.96 1.80416 12.6912 2.82604 13.0173L7.5677 14.5557L18.5385 7.3569C19.0573 7.02865 19.5312 7.20524 19.1417 7.5649L10.2531 15.9077H10.251L10.2531 15.9087L9.92604 20.9917C10.4052 20.9917 10.6167 20.7632 10.8854 20.4934L13.1885 18.1642L17.9792 21.8443C18.8625 22.3502 19.4969 22.0902 19.7167 20.9939L22.8615 5.58024C23.1833 4.23799 22.3687 3.63024 21.526 4.02674Z"
                fill="white"
              />
            </svg>{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Mainchat;
