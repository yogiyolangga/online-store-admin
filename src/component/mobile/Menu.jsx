import { FaTools } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import { IoCloseCircleOutline } from "react-icons/io5";
import { PiCodesandboxLogoFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Menu() {
  const [positionMenu, setPositionMenu] = useState("scale-0");
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("tokenAdmin");
    localStorage.removeItem("userAdmin");
    navigate("/");
  };
  return (
    <>
      <div className="w-full max-w-[360px] fixed z-10 bottom-0 bg-gradient-to-r from-[#25345d] to-[#1d243e] flex justify-evenly items-center py-3 px-6">
        <a href="/dashboard">
          <PiCodesandboxLogoFill className="text-2xl text-[#fff]" />
        </a>
        <div className="p-2 bg-zinc-900 rounded-full shadow-md shadow-black">
          {positionMenu === "scale-0" ? (
            <FaTools
              className="text-white text-2xl cursor-pointer"
              onClick={() => {
                setPositionMenu("scale-100");
              }}
            />
          ) : (
            <IoCloseCircleOutline
              className="text-white text-2xl cursor-pointer"
              onClick={() => {
                setPositionMenu("scale-0");
              }}
            />
          )}
        </div>
        <div>
          <BiLogOutCircle
            className="text-2xl text-[#fff] cursor-pointer"
            onClick={handleLogout}
          />
        </div>
      </div>
      <div
        className={`fixed bottom-16 flex items-center justify-center z-20 w-full duration-100 origin-bottom max-w-[360px] ${positionMenu}`}
      >
        <MenuList />
      </div>
    </>
  );
}

const MenuList = () => {
  return (
    <>
      <div className="w-[80%] flex flex-col gap-3 p-3 rounded-md bg-gradient-to-b from-[#38497f] to-[#243561]">
        <a href="/banner" className="font-semibold text-white border-b py-2">
          Ads Banner Home
        </a>
        <a href="/create" className="font-semibold text-white border-b py-2">
          Add New Admin
        </a>
        <a
          href="/categories"
          className="font-semibold text-white border-b py-2"
        >
          Categories Selling Product
        </a>
        <a href="/bank" className="font-semibold text-white border-b py-2">
          Bank Third Party Payment
        </a>
        <a href="/users" className="font-semibold text-white border-b py-2">
          Users
        </a>
      </div>
    </>
  );
};
