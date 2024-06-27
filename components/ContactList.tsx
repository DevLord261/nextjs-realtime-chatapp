"use client";
import micon from "@/public/message-icon.svg";
import Image from "next/image";
import Maincontant from "./Contact";
import HeroSection from "./HeroSection";
import "@/styles/Contactslist.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useSocket from "@/client/usesocket";

function Contacts() {
  const route = useRouter();

  const socket = useSocket();
  if (socket) {
    socket.on("conntect", () => {
      console.log("socket");
    });
  }

  return (
    <div className="Clist flex h-screen w-1/3 flex-col">
      <section className="border-r-2 border-gray-600 p-2">
        <HeroSection></HeroSection>
        {/* contacts part */}
        <div className="flex flex-row items-center space-x-2 p-3">
          <Image src={micon} alt="failed" />
          <span>All messages </span>
        </div>
        {/* Contancts list */}
        <Maincontant
          username={"Username"}
          lastmessage={"last message"}
          timesend={"4:30"}
        ></Maincontant>
      </section>
    </div>
  );
}

export default Contacts;
