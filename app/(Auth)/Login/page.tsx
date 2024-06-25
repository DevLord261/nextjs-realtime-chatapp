"use client";
import { auth } from "@/backend/fbcontext";
import "../Auth.css";
import {
  AuthErrorCodes,
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Login() {
  const [username, setusername] = useState("");
  const [pass, setpass] = useState("");
  const [fail, setfail] = useState(false);
  const route = useRouter();

  const sign = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, username, pass)
      .then((_user) => {
        route.push("/");
      })
      .catch((error) => {
        if (
          error.code == AuthErrorCodes.INVALID_EMAIL ||
          error.code == AuthErrorCodes.INVALID_PASSWORD
        )
          setfail(true);
      });
  };


  onAuthStateChanged(auth, (_user) => {
    if (_user) route.push("/");
  });
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
            type="email"
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
