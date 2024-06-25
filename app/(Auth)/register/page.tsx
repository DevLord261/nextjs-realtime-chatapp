"use client";
import { auth } from "@/backend/fbcontext";
import "../Auth.css";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Register() {
  const [username, setusername] = useState("");
  const [pass, setpass] = useState("");
  const [confirmpassword, setconfirmpass] = useState("");
  const [isvalid, setisvalid] = useState(true);

  const route = useRouter();
  onAuthStateChanged(auth, (_user) => {
    if (_user) route.push("/");
  });

  const reg = async (e: any) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, username, pass)
      .then((_user) => {
        console.log(_user.user);
        route.push("/");
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const validate = () => {
    if (confirmpassword == pass) setisvalid(true);
    else setisvalid(false);
  };

  useEffect(() => {
    if (pass != "" || confirmpassword != "") validate();
    if (username == "") setisvalid(false);
  }, [confirmpassword, pass, username]);

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
          <input
            type="email"
            name="username"
            className="input"
            placeholder="Email"
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
            className={`loginbtn ${!isvalid ? "cursor-not-allowed opacity-50" : "opacity-100"}`}
            disabled={!isvalid}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
