import { useParams } from "react-router-dom";
import Menu from "./Menu";
import { dollar, pretyDate, truncateTitle } from "../utils";
import { useState } from "react";
import Axios from "axios";
import { useEffect } from "react";
import { AiOutlineLoading } from "react-icons/ai";

export default function OrderDetails() {
  const params = useParams();
  const idProduct = params.product;
  const idOrderItem = params.orderitem;
  const idOrder = params.order;
  const [dataOrder, setDataOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseUrl = "http://localhost:3000";

  const getData = async () => {
    try {
      const response = await Axios.get(
        `${baseUrl}/admin/order/details/${idProduct}/${idOrderItem}/${idOrder}`
      );

      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (response.data.success) {
        setDataOrder(response.data.result[0]);
      } else if (response.data.error) {
        console.log(response.data.error);
      } else {
        console.log("Error Occured!");
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="w-full">
        <div className="w-full min-h-screen bg-zinc-800">
          {loading ? (
            <Loading />
          ) : (
            <DataOrder dataOrder={dataOrder} baseUrl={baseUrl} />
          )}
        </div>
        <Menu />
      </div>
    </>
  );
}

const DataOrder = ({ dataOrder, baseUrl }) => {
  return (
    <>
      <div className="w-full p-2">
        <h1 className="font-semibold text-white">Order Details</h1>
        <div className="py-1">
          <img
            src={`${baseUrl}/${dataOrder.img}`}
            alt="name"
            className="w-32 h-auto rounded-md"
          />
        </div>
        <div className="w-full">
          <h1 className="font-bold text-white text-lg">
            {truncateTitle(dataOrder.name)}
          </h1>
        </div>
        <div className="flex w-full flex-col gap-2 pt-2 pb-20">
          <div className="w-full py-2 border-b-[1px] rounded-md border-zinc-500">
            <div className="flex w-full justify-between px-2 border-l-2 py-1 gap-2 border-emerald-300">
              <div className="font-semibold text-zinc-200">Status</div>
              <div className="text-sm text-zinc-300">{dataOrder.status}</div>
            </div>
          </div>
          <div className="w-full py-2 border-b-[1px] rounded-md border-zinc-500">
            <div className="flex w-full justify-between px-2 border-l-2 py-1 gap-2 border-green-300">
              <div className="font-semibold text-zinc-200">Variant</div>
              <div className="text-sm text-zinc-300">
                {dataOrder.additional_info === ""
                  ? "None"
                  : dataOrder.additional_info}
              </div>
            </div>
          </div>
          <div className="w-full py-2 border-b-[1px] rounded-md border-zinc-500">
            <div className="flex w-full justify-between px-2 border-l-2 py-1 gap-2 border-purple-300">
              <div className="font-semibold text-zinc-200">Quantity</div>
              <div className="text-sm text-zinc-300">{dataOrder.quantity}</div>
            </div>
          </div>
          <div className="w-full py-2 border-b-[1px] rounded-md border-zinc-500">
            <div className="flex w-full justify-between items-center px-2 border-l-2 py-1 gap-2 border-pink-300">
              <div className="font-semibold text-zinc-200">{`Price (${
                dataOrder.discount === 0 ? "no discount" : "-" + dataOrder.discount + "%"
              })`}</div>
              <div className="text-sm text-zinc-300 flex flex-col">
                <div
                  className={`line-through text-xs ${
                    dataOrder.discount === 0 ? "hidden" : ""
                  }`}
                >
                  {dollar.format(dataOrder.price)}
                </div>
                <div className="font-semibold">
                  {dollar.format(
                    dataOrder.price -
                      dataOrder.price * (dataOrder.discount / 100)
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full py-2 border-b-[1px] rounded-md border-zinc-500">
            <div className="flex w-full justify-between px-2 border-l-2 py-1 gap-2 border-blue-300">
              <div className="font-semibold text-zinc-200">Address</div>
              <div className="text-sm text-zinc-300 text-right">
                {dataOrder.shipping_address}
              </div>
            </div>
          </div>
          <div
            className={`w-full py-2 border-b-[1px] rounded-md border-zinc-500 ${
              dataOrder.carrier === null ? "hidden" : ""
            }`}
          >
            <div className="flex w-full justify-between px-2 border-l-2 py-1 gap-2 border-yellow-300">
              <div className="font-semibold text-zinc-200">Shipping</div>
              <div className="text-sm text-zinc-300">
                {`${dataOrder.carrier}, ${dataOrder.tracking_number}`}
              </div>
            </div>
          </div>
          <div
            className={`w-full py-2 border-b-[1px] rounded-md border-zinc-500 ${
              dataOrder.shipped_date === null ? "hidden" : ""
            }`}
          >
            <div className="flex w-full justify-between px-2 border-l-2 py-1 gap-2 border-yellow-300">
              <div className="font-semibold text-zinc-200">Shipping Date</div>
              <div className="text-sm text-zinc-300">
                {pretyDate(dataOrder.shipped_date)}
              </div>
            </div>
          </div>
          <div className="w-full py-2 border-b-[1px] rounded-md border-zinc-500">
            <div className="flex w-full justify-between px-2 border-l-2 py-1 gap-2 border-red-300">
              <div className="font-semibold text-zinc-200">Order Date</div>
              <div className="text-sm text-zinc-300">
                {pretyDate(dataOrder.order_date)}
              </div>
            </div>
          </div>
          <div className="w-full py-2 border-b-[1px] rounded-md border-zinc-500">
            <div className="flex w-full justify-between items-center px-2 border-l-2 py-1 gap-2 border-lime-300">
              <div className="font-semibold flex-1 text-zinc-200">
                Payment Method
              </div>
              <div className="w-4 h-4 flex items-center justify-center text-white font-semibold text-sm rounded-full bg-zinc-400 group relative">
                !
                <div className="absolute p-1 rounded bg-zinc-400 -translate-y-10 scale-0 duration-200 group-hover:scale-100 text-xs w-[50vw]">
                  total payment plus fee and maybe with another product, and also minus
                  discount
                </div>
              </div>
              <div className="text-sm text-zinc-300">
                {`${dataOrder.payment_method}, ${dollar.format(
                  dataOrder.total_price
                )} `}
              </div>
            </div>
          </div>
          <div className="w-full py-2 border-b-[1px] rounded-md border-zinc-500">
            <div className="flex w-full justify-between px-2 border-l-2 py-1 gap-2 border-sky-300">
              <div className="font-semibold text-zinc-200">Seller</div>
              <div className="text-sm text-zinc-300">{dataOrder.seller}</div>
            </div>
          </div>
          <div className="w-full py-2 border-b-[1px] rounded-md border-zinc-500">
            <div className="flex w-full justify-between px-2 border-l-2 py-1 gap-2 border-rose-300">
              <div className="font-semibold text-zinc-200">Buyer</div>
              <div className="text-sm text-zinc-300">{dataOrder.buyer}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Loading = () => {
  return (
    <div className="w-full h-full flex justify-center flex-col items-center py-5">
      <AiOutlineLoading className="text-xl animate-spin text-zinc-100" />
      <p className="text-lg font-semibold text-white">Please wait...</p>
    </div>
  );
};
