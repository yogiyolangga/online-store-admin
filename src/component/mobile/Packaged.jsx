import { useEffect, useState } from "react";
import Menu from "./Menu";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { isLoggedIn, truncateTitle } from "../utils";

export default function Packaged() {
  const baseUrl = "http://localhost:3000";
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <div className="w-full">
        <div className="w-full min-h-screen py-4 bg-gradient-to-b from-[#22315a] to-[#1f2847]">
          <div className="w-full px-2">
            <h1 className="font-semibold text-white">Order Packaged</h1>
            <img
              src="images/progress.png"
              alt="Payment"
              className="w-48 mx-auto"
            />
          </div>
          <div>
            <Data baseUrl={baseUrl} />
          </div>
        </div>
        <Menu />
      </div>
    </>
  );
}

const Data = ({ baseUrl }) => {
  const [data, setData] = useState([]);

  const getData = () => {
    Axios.get(`${baseUrl}/admin/orderpack`).then((response) => {
      if (response.data.success) {
        setData(response.data.result);
      } else if (response.data.error) {
        console.log(response.data.error);
      } else {
        console.log("Error Occured!");
      }
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="w-full px-2 pt-4 pb-20">
        <div className="w-full flex flex-col gap-2">
          {data.length < 1 ? (
            <div className="text-center text-white font-bold">
              No have data on packaging
            </div>
          ) : (
            data.map((item) => (
              <a href={`/order/detail/${item.product_id}/${item.order_item_id}/${item.order_id}`}
                key={item.order_item_id}
                className="p-2 border shadow flex justify-between gap-2 items-center bg-zinc-200 rounded"
              >
                <div>
                  <img
                    src={`${baseUrl}/${item.img}`}
                    alt="pending icon"
                    className="w-10 rounded-md"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-center">
                  <div className="font-semibold">
                    {truncateTitle(item.name)}
                  </div>
                  <div className="text-zinc-700 text-sm flex">
                    <p>
                      {item.quantity}, {item.additional_info}
                    </p>
                  </div>
                </div>
                <div></div>
                <div className="">
                  <p className="text-xs font-light text-zinc-600">
                    seller :{" "}
                    <span className="text-sm font-semibold text-zinc-900">
                      {item.seller}
                    </span>
                  </p>
                </div>
              </a>
            ))
          )}
        </div>
      </div>
    </>
  );
};