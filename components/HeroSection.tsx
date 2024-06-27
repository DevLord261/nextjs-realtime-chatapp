import picon from "@/public/Newchat.svg";
import styles from "@/styles/Contacts.module.css";
import Image from "next/image";
import Logo from "@/public/Group.svg";
import Dots from "@/public/dots.svg";

interface props {
  logout: () => void;
}

function HeroSection() {
  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-row justify-between pl-3">
        <div className="flex flex-row items-center space-x-3">
          <Image src={Logo} alt="error happened" />
          <span className={styles.bubble}>Chat Bubble</span>
        </div>
        <Image src={Dots} alt="failed" className="cursor-pointer" />
      </div>

      <div className="ml-2 mt-3 flex flex-row items-center space-x-0 md:space-x-12">
        <input className={styles.search} placeholder="search people" />
        <Image
          src={picon}
          alt="failed to load"
          className="w-10 cursor-pointer md:w-[13%]"
        />
      </div>
    </div>
  );
}

export default HeroSection;
