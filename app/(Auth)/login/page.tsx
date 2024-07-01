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
  const login = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await axios
        .post(`${API}/login`, {
          username: username,
          password: pass,
        })
        .then((res) => {
          const data = res.data;
          if (data.result) {
            localStorage.setItem("accessToken", data.accessToken);
            sessionStorage.setItem("username", username);
            route.push("/");
          } else {
            setfail(true);
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
        {fail && (
          <div className="mt-2 flex items-center rounded-lg bg-red-800 p-3 text-white">
            <svg
              className="mr-2 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01m-6.938 4h13.856c1.054 0 1.502-1.255.732-1.988L13.732 9.27a1 1 0 00-1.464 0L4.403 18.012c-.77.733-.322 1.988.732 1.988z"
              />
            </svg>
            <span>Login failed</span>
          </div>
        )}
        <form
          className="flex w-full flex-col space-y-10"
          method="post"
          onSubmit={login}
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
