import { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../utils";

export default function CreateAdmin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("");
  const baseUrl = "http://localhost:3000";
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
    }
  });

  const onSubmit = async () => {
    try {
      const response = await Axios.post(`${baseUrl}/api/admin/create`, {
        username: username,
        password: password,
        email: email,
        fullName: fullName,
        role: role,
      });

      if (response.data.errorValidation) {
        alert(response.data.errorValidation);
      } else if (response.data.success) {
        alert(response.data.success);
        navigate("/dashboard");
      } else {
        console.log("Server error");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="w-full min-h-screen bg-gray-900 flex flex-col justify-center items-center">
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
          <input
            type="email"
            placeholder="email"
            className="bg-white bg-opacity-0 outline-none py-1 text-white border-b border-white w-2/3"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="full name"
            className="bg-white bg-opacity-0 outline-none py-1 text-white border-b border-white w-2/3"
            onChange={(e) => {
              setFullName(e.target.value);
            }}
          />
          <select
            name="role"
            id="role"
            className="bg-white bg-opacity-0 outline-none py-1 text-white border-b border-white w-2/3"
            onChange={(e) => {
              setRole(e.target.value);
            }}
          >
            <option value="" className="text-zinc-800">
              select role
            </option>
            <option value="administrator" className="text-zinc-800">
              Administrator
            </option>
            <option value="moderator" className="text-zinc-800">
              moderator
            </option>
            <option value="staff" className="text-zinc-800">
              staff
            </option>
          </select>
          <button
            className="text-white font-bold py-2 w-2/3 bg-gradient-to-r from-blue-500 to-zinc-700 rounded-2xl shadow shadow-white"
            onClick={onSubmit}
          >
            Login
          </button>
          <p className="text-sm text-zinc-300">need help to create</p>
          <a href="/dashboard" className="font-semibold text-zinc-300">cancel</a>
        </div>
      </div>
    </>
  );
}
