import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdNotificationsActive } from "react-icons/md";
import Menu from "./Menu";

import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";

export default function Dashboard() {
  const baseUrl = "http://localhost:3000";
  const navigate = useNavigate();

  const isLoggedIn = () => {
    const token = localStorage.getItem("tokenAdmin");
    return !!token;
  };

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
    }
  });

  return (
    <>
      <div className="w-full">
        <div className="w-full min-h-screen py-4 bg-gradient-to-b from-[#22315a] to-[#1f2847]">
          <div className="w-full px-6 flex items-center gap-1">
            <img
              src="images/usermask.jpg"
              alt="Profile"
              className="w-8 rounded"
            />
            <h1 className="text-white font-light">
              Hello, <span className="font-semibold">Name!</span>
            </h1>
            <div className="flex-1 flex justify-end">
              <MdNotificationsActive className="text-white text-xl" />
            </div>
          </div>
          <div>
            <Chart />
          </div>
          <div>
            <Widget />
          </div>
        </div>
        <Menu />
      </div>
    </>
  );
}

const Widget = () => {
  return (
    <>
      <div className="w-full px-6 flex flex-col py-6 gap-2">
        <div
          className="w-full backdrop-blur-md py-2 bg-gradient-to-r from-[#45bcfe] to-[#7e54de] bg-opacity-90 rounded-3xl
         flex justify-between px-2 items-center"
        >
          <h1 className="text-sm text-zinc-50 font-semibold">
            Request Confirm Pay
          </h1>
          <div className="flex w-6 h-6 text-white font-semibold rounded-full justify-center items-center bg-red-400">
            2
          </div>
        </div>
        <div
          className="w-full backdrop-blur-md py-2 bg-gradient-to-r from-[#45bcfe] to-[#7e54de] bg-opacity-90 rounded-3xl
         flex justify-between px-2 items-center"
        >
          <h1 className="text-sm text-zinc-50 font-semibold">Not yet pay</h1>
          <div className="flex w-6 h-6 text-white font-semibold rounded-full justify-center items-center bg-red-400">
            2
          </div>
        </div>
        <div
          className="w-full backdrop-blur-md py-2 bg-gradient-to-r from-[#45bcfe] to-[#7e54de] bg-opacity-90 rounded-3xl
         flex justify-between px-2 items-center"
        >
          <h1 className="text-sm text-zinc-50 font-semibold">Packaged order</h1>
          <div className="flex w-6 h-6 text-white font-semibold rounded-full justify-center items-center bg-red-400">
            2
          </div>
        </div>
        <div
          className="w-full backdrop-blur-md py-2 bg-gradient-to-r from-[#45bcfe] to-[#7e54de] bg-opacity-90 rounded-3xl
         flex justify-between px-2 items-center"
        >
          <h1 className="text-sm text-zinc-50 font-semibold">Shipping order</h1>
          <div className="flex w-6 h-6 text-white font-semibold rounded-full justify-center items-center bg-red-400">
            2
          </div>
        </div>
        <div
          className="w-full backdrop-blur-md py-2 bg-gradient-to-r from-[#45bcfe] to-[#7e54de] bg-opacity-90 rounded-3xl
         flex justify-between px-2 items-center"
        >
          <h1 className="text-sm text-zinc-50 font-semibold">Finished order</h1>
          <div className="flex w-6 h-6 text-white font-semibold rounded-full justify-center items-center bg-red-400">
            2
          </div>
        </div>
      </div>
    </>
  );
};

const Chart = () => {
  const dataset = [
    {
      london: 59,
      paris: 57,
      newYork: 86,
      seoul: 21,
      month: "Jan",
    },
    {
      london: 50,
      paris: 52,
      newYork: 78,
      seoul: 28,
      month: "Feb",
    },
    {
      london: 47,
      paris: 53,
      newYork: 106,
      seoul: 41,
      month: "Mar",
    },
    {
      london: 54,
      paris: 56,
      newYork: 92,
      seoul: 73,
      month: "Apr",
    },
    {
      london: 57,
      paris: 69,
      newYork: 92,
      seoul: 99,
      month: "May",
    },
    {
      london: 60,
      paris: 63,
      newYork: 103,
      seoul: 144,
      month: "June",
    },
    {
      london: 59,
      paris: 60,
      newYork: 105,
      seoul: 319,
      month: "July",
    },
    {
      london: 65,
      paris: 60,
      newYork: 106,
      seoul: 249,
      month: "Aug",
    },
    {
      london: 51,
      paris: 51,
      newYork: 95,
      seoul: 131,
      month: "Sept",
    },
    {
      london: 60,
      paris: 65,
      newYork: 97,
      seoul: 55,
      month: "Oct",
    },
    {
      london: 67,
      paris: 64,
      newYork: 76,
      seoul: 48,
      month: "Nov",
    },
    {
      london: 61,
      paris: 70,
      newYork: 103,
      seoul: 25,
      month: "Dec",
    },
  ];

  const valueFormatter = (value) => `${value}mm`;

  const chartSetting = {
    yAxis: [
      {
        label: "selling (pcs)",
      },
    ],
    series: [{ dataKey: "seoul", label: "Selling Chart", valueFormatter }],
    height: 300,
    sx: {
      [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
        transform: "translateX(-5px)",
      },
    },
  };
  return (
    <>
      <div style={{ width: "100%" }}>
        <BarChart
          dataset={dataset}
          colors={['#45bcfe']}
          xAxis={[
            {
              scaleType: "band",
              dataKey: "month",
            },
          ]}
          {...chartSetting}
        />
      </div>
    </>
  );
};
