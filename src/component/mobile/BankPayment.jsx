import { useState } from "react";
import Menu from "./Menu";
import Axios from "axios";
import { useEffect } from "react";

export default function BankPayment() {
  const baseUrl = import.meta.env.VITE_API_URL;
  return (
    <>
      <div className="w-full">
        <div className="w-full min-h-screen py-4 bg-gradient-to-b from-[#22315a] to-[#1f2847] flex flex-col items-center">
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-[#815ee0] to-[#eeadd5] bg-clip-text text-transparent">
            Bank Payment
          </h1>
          <div>
            <Form baseUrl={baseUrl} />
          </div>
          <div className="w-full">
            <ListBank baseUrl={baseUrl} />
          </div>
        </div>
        <Menu />
      </div>
    </>
  );
}

const Form = ({ baseUrl }) => {
  const [bank, setBank] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    Axios.post(`${baseUrl}/api/admin/bank`, {
      bank: bank,
      name: name,
      number: number,
    }).then((response) => {
      if (response.data.success) {
        alert("Success");
        window.location.reload();
      } else if (response.data.error) {
        console.log(response.data.error);
      } else {
        console.log("Server might die");
      }
    });
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="w-full py-6 px-6 flex flex-col gap-6"
      >
        <div className="w-full flex flex-col">
          <label htmlFor="name" className="text-zinc-300 text-sm">
            Bank Name
          </label>
          <input
            type="text"
            id="bank"
            placeholder="Bank"
            value={bank}
            required
            onChange={(e) => {
              setBank(e.target.value);
            }}
            className="w-full outline-none py-1 text-white  bg-transparent px-1"
          />
          <div className="h-0.5 rounded-2xl bg-gradient-to-r from-[#815ee0] to-[#eeadd5]"></div>
        </div>
        <div className="w-full flex flex-col">
          <label htmlFor="name" className="text-zinc-300 text-sm">
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Name"
            value={name}
            required
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="w-full outline-none py-1 text-white  bg-transparent px-1"
          />
          <div className="h-0.5 rounded-2xl bg-gradient-to-r from-[#815ee0] to-[#eeadd5]"></div>
        </div>
        <div className="w-full flex flex-col">
          <label htmlFor="number" className="text-zinc-300 text-sm">
            number
          </label>
          <input
            type="number"
            id="number"
            placeholder="Number"
            value={number}
            onChange={(e) => {
              setNumber(e.target.value);
            }}
            className="w-full outline-none py-1 text-white  bg-transparent px-1"
          />
          <div className="h-0.5 rounded-2xl bg-gradient-to-r from-[#815ee0] to-[#eeadd5]"></div>
        </div>
        <div className="w-full flex justify-center">
          <button
            className="w-2/3 py-3 text-white font-semibold shadow shadow-black bg-gradient-to-r from-[#45bcfe] to-[#7e54de] rounded-full scale-95 duration-100"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

const ListBank = ({ baseUrl }) => {
  const [data, setData] = useState([]);

  const getData = () => {
    Axios.get(`${baseUrl}/api/adminget/bank`).then((response) => {
      if (response.data.error) {
        console.log(response.data.error);
      } else if (response.data.success) {
        setData(response.data.result);
      } else {
        console.log("Error");
      }
    });
  };

  const deleteBank = (id) => {
    Axios.delete(`${baseUrl}/api/admin/bank/${id}`).then((response) => {
      if (response.data.error) {
        console.log(response.data.error);
      } else if (response.data.success) {
        getData();
      } else {
        console.log("error");
      }
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold text-center text-white my-2">
          List Bank
        </h1>
        <div className="w-full flex justify-between px-3">
          <div className="text-white font-semibold">BANK</div>
          <div className="text-white font-semibold">Name</div>
          <div className="text-white font-semibold">Number</div>
          <div className="text-white font-semibold">Action</div>
        </div>
        <div className="flex flex-col w-full gap-2">
          {data.map((item) => (
            <div key={item.id} className="w-full flex justify-between px-3">
              <div className="text-white font-semibold">{item.bank}</div>
              <div className="text-white font-semibold">{item.name}</div>
              <div className="text-white font-semibold">{item.number}</div>
              <div className="text-white font-semibold">
                <button
                  className="bg-red-500 rounded-md px-1"
                  onClick={() => deleteBank(item.id)}
                >
                  delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
