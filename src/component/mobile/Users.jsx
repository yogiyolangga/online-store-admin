import { useState } from "react";
import Menu from "./Menu";
import { FiSearch } from "react-icons/fi";
import { ImSpinner } from "react-icons/im";
import Axios from "axios";
import { pretyDate } from "../utils";

export default function Users() {
  const [greetStyle, setGreetStyle] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [resultStyle, setResultStyle] = useState("hidden");
  const [loading, setLoading] = useState(false);
  const apiUrl = "http://localhost:3000";
  const [clientUsername, setClientUsername] = useState("");

  const getSearch = async () => {
    setLoading(true);
    setGreetStyle("hidden");
    setSearch("");
    setSearchResult([]);
    try {
      const response = await Axios.get(
        `${apiUrl}/admin/search/${clientUsername}`
      );

      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (response.data.success) {
        setSearchResult(response.data.result[0]);
        setResultStyle("");
      } else if (response.data.error) {
        console.log(response.data.error);
      } else if (response.data.notFound) {
        setSearch(response.data.notFound);
      } else {
        console.log("Something went wrong");
      }

      setLoading(false);
      setClientUsername("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full">
        <div className="w-full min-h-screen py-2 bg-zinc-900">
          <h1 className="text-2xl font-semibold text-zinc-200 px-4">Users</h1>
          <div>
            <SearchBar
              setClientUsername={setClientUsername}
              getSearch={getSearch}
              clientUsername={clientUsername}
            />
          </div>
          <div className={greetStyle}>
            <Greet />
          </div>
          <div>
            {loading === true ? (
              <Loading />
            ) : (
              <DataResult
                resultStyle={resultStyle}
                searchResult={searchResult}
              />
            )}
          </div>
          <div className="flex justify-center py-2 text-zinc-200 font-semibold">
            {search}
          </div>
        </div>
        <Menu />
      </div>
    </>
  );
}

const SearchBar = ({ setClientUsername, clientUsername, getSearch }) => {
  return (
    <>
      <div className="w-full px-2 py-2">
        <div className="w-full bg-zinc-800 border rounded-md flex py-1.5 justify-between items-center gap-1 px-2">
          <FiSearch className="text-lg text-white" />
          <input
            type="text"
            className="flex-1 outline-none border-l bg-transparent px-1 text-white"
            placeholder="username"
            value={clientUsername}
            onChange={(e) => {
              setClientUsername(e.target.value);
            }}
          />
          <button
            className="px-2 bg-blue-900 shadow-white shadow-sm active:scale-95 flex items-center font-semibold text text-zinc-200 rounded-md hover:scale-110"
            onClick={() => {
              clientUsername === ""
                ? alert("Please enter a username")
                : getSearch();
            }}
          >
            Search
          </button>
        </div>
      </div>
    </>
  );
};

const Greet = () => {
  return (
    <>
      <div className="w-full flex flex-col items-center justify-center">
        <img src="images/search-user.png" alt="Greet" className="w-32 h-32" />
        <p className="text-zinc-200 font-semibold text-sm">
          Please input username client
        </p>
      </div>
    </>
  );
};

const Loading = () => {
  return (
    <>
      <div className="w-full flex flex-col items-center justify-center">
        <ImSpinner className="text-zinc-200 text-xl animate-spin" />
        <p className="text-sm font-semibold text-zinc-200">loading data</p>
      </div>
    </>
  );
};

const DataResult = ({ resultStyle, searchResult }) => {
  return (
    <>
      <div className={`w-full py-3 flex flex-col gap-2 px-2 ${resultStyle}`}>
        <div className="w-full flex gap-3 text-zinc-200 font-semibold justify-between border-b py-2 border-zinc-500">
          <div>Full Name</div>
          <div>{searchResult.fullname}</div>
        </div>
        <div className="w-full flex gap-3 text-zinc-200 font-semibold justify-between border-b py-2 border-zinc-500">
          <div>Username</div>
          <div>{searchResult.username}</div>
        </div>
        <div className="w-full flex gap-3 text-zinc-200 font-semibold justify-between border-b py-2 border-zinc-500">
          <div>Number</div>
          <div>{searchResult.number}</div>
        </div>
        <div className="w-full flex gap-3 text-zinc-200 font-semibold justify-between border-b py-2 border-zinc-500">
          <div>Email</div>
          <div>{searchResult.email}</div>
        </div>
        <div className="w-full flex gap-3 text-zinc-200 font-semibold justify-between border-b py-2 border-zinc-500">
          <div>Gender</div>
          <div>{searchResult.gender}</div>
        </div>
        <div className="w-full flex gap-3 text-zinc-200 font-semibold justify-between border-b py-2 border-zinc-500">
          <div>Birthday</div>
          <div>{pretyDate(searchResult.birthday)}</div>
        </div>
        <div className="w-full flex gap-3 text-zinc-200 font-semibold justify-between border-b py-2 border-zinc-500">
          <div>Address</div>
          <div className="text-right text-xs">{searchResult.address}</div>
        </div>
        <div className="w-full flex gap-3 text-zinc-200 font-semibold justify-between border-b py-2 border-zinc-500">
          <div>Join Date</div>
          <div>{pretyDate(searchResult.join_date)}</div>
        </div>
        <div
          className={`w-full flex gap-3 text-zinc-200 font-semibold justify-between border-b py-2 border-zinc-500 ${
            !searchResult.store_name ? "hidden" : ""
          }`}
        >
          <div className="text-lg font-bold">Store</div>
          <div>{searchResult.store_name}</div>
        </div>
      </div>
    </>
  );
};
