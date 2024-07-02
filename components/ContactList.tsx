"use client";
import micon from "@/public/message-icon.svg";
import Image from "next/image";
import Maincontant from "./Contact";
import HeroSection from "./HeroSection";
import "@/styles/Contactslist.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useSocket from "@/client/usesocket";
import axios from "axios";
import { store } from "next/dist/build/output/store";
import { router } from "next/client";
import { headers } from "next/headers";

function Contacts() {
  const route = useRouter();
  const API = process.env.NEXT_PUBLIC_BASE_API_URL;
  const socket = useSocket();
  if (socket) {
    socket.on("conntect", () => {
      console.log("socket");
    });
  }
  useEffect(() => {
    const checkToken = async () => {
      const storedToken = localStorage.getItem("accessToken");
      if (!storedToken) {
        route.push("/login");
        return;
      }
      try {
        const response = await axios.get(`${API}/checklogin`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        const data = await response.data;
        console.log("check token", data);
      } catch (e: any) {
        console.error(e.message);
        localStorage.removeItem("accessToken"); // Clear the invalid token
        route.push("/login");
      }
    };

    checkToken();
  }, []);

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
