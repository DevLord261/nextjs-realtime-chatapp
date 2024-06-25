"use client";
import Image from "next/image";
import profile from "@/public/profile.svg";
import { useState } from "react";

interface Props {
  checkwho: boolean;
}
function Box({ checkwho }: Props) {
  return checkwho ? (
    <div className="ms-12 mt-5">
      <div>
        <div className={`flex flex-row items-center space-x-3`}>
          <Image
            src={profile}
            alt="failed"
            className="rounded-full"
            width={50}
            height={50}
          />
          <div className="space-x-5">
            <span className="username">Username</span>
            <span>4:30</span>
          </div>
        </div>
        <div className="senderbox">Sender message box content</div>
      </div>
    </div>
  ) : (
    <div className="mr-12 mt-5 flex justify-end">
      <div>
        <div className="flex flex-row-reverse items-center space-x-3">
          <Image
            src={profile}
            alt="failed"
            className="rounded-full"
            width={50}
            height={50}
          />
          <div className="mr-3 space-x-5">
            <span>4:30</span>
            <span className="username">Username</span>
          </div>
        </div>
        <div className="recieverbox">Sender message box content</div>
      </div>
    </div>
  );
}

export default Box;
