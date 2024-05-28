import { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);
  const baseUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const loginSubmit = () => {
    Axios.post(`${baseUrl}/api/admin/login`, {
      username: username,
      password: password,
    })
      .then((response) => {
        if (
          response.status === 200 &&
          response.data.success === "Login successfully"
        ) {
          setLoginStatus(true);
          localStorage.setItem("tokenAdmin", response.data.token);
          localStorage.setItem("userAdmin", response.data.username);
          navigate("/dashboard");
        } else {
          alert("login failed");
        }
      })
      .catch((error) => {
        if (error) {
          console.log(error);
        }
      });
  };

  const isLoggedIn = () => {
    const token = localStorage.getItem("tokenAdmin");
    return !!token;
  };

  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/dashboard");
    }
  });

  return (
    <>
      <div className="w-full min-h-screen bg-gray-900 flex flex-col justify-center items-center">
        <div className="font-extrabold text-2xl text-white">Welcome</div>
        <div className="h-1.5 w-16 bg-white rounded-md mt-5"></div>
        <div className="py-7">
          <img
            src="images/loginadmin.png"
            alt="Login Admin"
            className="w-36 opacity-60"
          />
        </div>
        <div className="w-full flex flex-col items-center gap-8 justify-center py-10">
          <input
            type="text"
            placeholder="username"
            className="bg-white bg-opacity-0 outline-none py-1 text-white border-b border-white w-2/3"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="password"
            className="bg-white bg-opacity-0 outline-none py-1 text-white border-b border-white w-2/3"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button
            className="text-white font-bold py-2 w-2/3 bg-gradient-to-r from-blue-500 to-zinc-700 rounded-2xl shadow shadow-white"
            onClick={loginSubmit}
          >
            Login
          </button>
          <p className="text-sm text-zinc-300">need help to login</p>
        </div>
      </div>
    </>
  );
}
