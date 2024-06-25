"use client";
import profile from "@/public/profile.svg";
import Image from "next/image";
import { useState } from "react";

interface MaincontantProps {
  username: string;
  lastmessage: string;
  timesend: string;
}

function Maincontant({ username, lastmessage, timesend }: MaincontantProps) {
  const [unread, isunread] = useState(false);

  return (
    <div className="flex flex-row items-center p-1 hover:bg-gray-800">
      <Image
        src={profile}
        alt="failed"
        className="w-1/6 cursor-pointer rounded-full"
      />

      <div className="flex w-full cursor-pointer">
        <div className="flex w-full flex-col space-y-1 pl-3">
          <span>{username}</span>
          <span>{lastmessage}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="pe-2">{timesend}</span>
          {!unread ? (
            <span className="h-5 w-5 items-center justify-center rounded-full bg-green-600">
              12
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Maincontant;
