"use client";

import "../Auth.css";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

function Register() {
  const API = process.env.NEXT_PUBLIC_BASE_API_URL;
  const [username, setusername] = useState("");
  const [pass, setpass] = useState("");
  const [confirmpassword, setconfirmpass] = useState("");
  const [isvalid, setisvalid] = useState(false);
  const [cansubmit, setsubmit] = useState(true);
  const route = useRouter();

  const checkexisteduser = async (name: string) => {
    try {
      await axios
        .post(`${API}/checkuser`, {
          username: name,
        })
        .then((res) => {
          setisvalid(res.data.exists);
          setusername(name);
        });
    } catch (e: any) {
      console.error(e.message);
    }
  };

  const reg = async (e: any) => {
    e.preventDefault();
    try {
      await axios
        .post(`${API}/register`, {
          username: username,
          password: pass,
        })
        .then((res) => {
          console.log(res);
          route.push("/");
        });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (
      pass == confirmpassword &&
      pass != "" &&
      confirmpassword != "" &&
      pass.length > 7 &&
      !isvalid
    )
      setsubmit(false);
    else setsubmit(true);
  }, [pass, confirmpassword, username]);

  return (
    <div className="rootpage flex h-screen w-screen flex-col items-center justify-center">
      {/* content */}
      <div className="flex h-3/6 w-1/4 flex-col items-center justify-between">
        <div className="title flex w-full justify-start">Sign up</div>
        <form
          className="flex w-full flex-col space-y-10"
          method="post"
          onSubmit={reg}
        >
          {isvalid && (
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
              <span>Username already taken</span>
            </div>
          )}
          <input
            type="text"
            name="username"
            className="input"
            placeholder="Username"
            onChange={(e) => checkexisteduser(e.target.value)}
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
          <input
            type="password"
            name="confirmpassword"
            className="input"
            placeholder="Confirm password"
            onChange={(e) => setconfirmpass(e.target.value)}
            required
          />
          <button
            type="submit"
            className={`loginbtn ${cansubmit ? "cursor-not-allowed opacity-50" : ""}`}
            disabled={cansubmit}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
