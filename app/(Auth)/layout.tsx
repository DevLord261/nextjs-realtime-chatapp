import "./Auth.css";
import Image from "next/image";
import triangle from "@/public/Polygon 1.svg";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      {/* designs */}
      <div className="fixed -start-[30rem] top-20 z-10 h-[45rem] w-5/12 rounded-full bg-[#4044ed]"></div>
      <div className="fixed start-32 top-32 z-20 h-20 w-20 rounded-full bg-[#93DFFF]"></div>

      <div className="fixed -bottom-[100px] -right-[100px] z-10 flex flex-col">
        <Image
          src={triangle}
          alt="failed"
          className="-mb-[180px] -ml-[200px]"
        />

        <Image
          src={triangle}
          alt="failed"
          className="-mb-[190px] -ml-[100px]"
        />
        <Image src={triangle} alt="failed" />
      </div>
      {children}
    </section>
  );
}
