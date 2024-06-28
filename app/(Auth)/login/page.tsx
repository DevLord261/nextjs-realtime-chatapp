"use client";

import "../Auth.css";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

function Login() {
  const [username, setusername] = useState("");
  const [pass, setpass] = useState("");
  const [fail, setfail] = useState(false);
  const route = useRouter();
  const API = process.env.NEXT_PUBLIC_BASE_API_URL;
  const sign = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await axios
        .post(`${API}/login`, {
          username: username,
          password: pass,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.result) {
            console.log(res.data);
            route.push("/");
          }
        });
    } catch (e: any) {
      console.error(e.message);
      throw e;
    }
  };

  return (
    <div className="rootpage flex h-screen w-screen flex-col items-center justify-center">
      {/* content */}
      <div className="flex h-3/6 w-1/4 flex-col items-center justify-between">
        <div className="title flex w-full justify-start">Login</div>
        <form
          className="flex w-full flex-col space-y-10"
          method="post"
          onSubmit={sign}
        >
          <input
            type="text"
            name="username"
            className="input"
            placeholder="Username"
            onChange={(e) => setusername(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            className="input"
            placeholder="Password"
            onChange={(e) => setpass(e.target.value)}
            required
          />
          <button type="submit" className="loginbtn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
