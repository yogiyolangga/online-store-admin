import { useEffect, useState } from "react";
import Menu from "./Menu";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { dollar } from "../utils";

export default function PaymentConfirm() {
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
  }, []);
  return (
    <>
      <div className="w-full">
        <div className="w-full min-h-screen py-4 bg-gradient-to-b from-[#22315a] to-[#1f2847]">
          <div className="w-full px-2">
          <h1 className="font-semibold text-white">Payment Confirmation</h1>
            <img
              src="images/payment.png"
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
    Axios.get(`${baseUrl}/admin/orderpay`).then((response) => {
      if (response.data.success) {
        setData(response.data.result);
      } else if (response.data.error) {
        console.log(response.data.error);
      } else {
        console.log("Error Occured!");
      }
    });
  };

  const handleConfirmClick = (id) => {
    Axios.put(`${baseUrl}/admin/confirmpay/${id}`).then((response) => {
      if (response.data.success) {
        alert("Payment Approved!");
        window.location.reload();
      } else {
        console.log("Error", response);
      }
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="w-full px-2 py-4">
        <div className="w-full flex flex-col gap-2">
          {data.length < 1 ? (
            <div className="text-center text-white font-bold">
              Data Empty, Well Done
            </div>
          ) : (
            data.map((item) => (
              <div
                key={item.order_id}
                className="p-2 border shadow flex justify-between items-center bg-zinc-200 rounded"
              >
                <div>
                  <img
                    src="/images/pending-icon.png"
                    alt="pending icon"
                    className="w-10 opacity-80"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="font-semibold">{item.payment_method}</div>
                  <div className="text-zinc-700 text-sm">
                    {item.bank_number}
                  </div>
                </div>
                <div className="font-bold text-lg">
                  {dollar.format(item.total_price)}
                </div>
                <button
                  onClick={() => {
                    const isConfirmed = window.confirm("Approve Payment ?");
                    if (isConfirmed) {
                      handleConfirmClick(item.order_id);
                    }
                  }}
                  className="py-1 px-3 rounded-3xl text-white font-semibold text-sm bg-blue-500 shadow"
                >
                  Confirm
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};
