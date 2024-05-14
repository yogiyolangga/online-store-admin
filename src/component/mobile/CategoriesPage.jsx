import Axios from "axios";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import Menu from "./Menu";

export default function Categories() {
  const baseUrl = "http://localhost:3000";
  return (
    <>
      <div className="w-full">
        <div className="w-full min-h-screen py-4 bg-gradient-to-b from-[#22315a] to-[#1f2847] flex flex-col items-center">
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-[#815ee0] to-[#eeadd5] bg-clip-text text-transparent">
            Add Category
          </h1>
          <div className="w-full">
            <Form baseUrl={baseUrl} />
          </div>
          <div className="w-full">
            <ListCategories baseUrl={baseUrl} />
          </div>
        </div>
        <Menu />
      </div>
    </>
  );
}

const Form = ({ baseUrl }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState(null);

  const handleChangeIcon = (e) => {
    const file = e.target.files[0];
    setIcon(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("name", name);
    fd.append("description", description);
    fd.append("icon", icon);
    Axios.post(`${baseUrl}/api/admin/category`, fd).then((response) => {
      if (response.data.success) {
        alert("Category added successfully");
        setName("");
        setDescription("");
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
            Category Name
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
          <label htmlFor="description" className="text-zinc-300 text-sm">
            Description
          </label>
          <input
            type="text"
            id="description"
            placeholder="Description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            className="w-full outline-none py-1 text-white  bg-transparent px-1"
          />
          <div className="h-0.5 rounded-2xl bg-gradient-to-r from-[#815ee0] to-[#eeadd5]"></div>
        </div>
        <div className="w-full flex flex-col">
          <label htmlFor="icon" className="text-zinc-300 text-sm">
            Icon
          </label>
          <input
            type="file"
            id="icon"
            accept="image/*"
            onChange={handleChangeIcon}
            className="w-full outline-none hidden py-1 text-white bg-white bg-transparent px-1"
          />
          <label htmlFor="icon" className="text-zinc-300 py-1 text-sm">
            Select image
          </label>
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

const ListCategories = ({ baseUrl }) => {
  const [categories, setCategories] = useState([]);

  const getCategories = () => {
    Axios.get(`${baseUrl}/api/admin/categories`).then((response) => {
      if (response.data.success) {
        setCategories(response.data.result);
      } else if (response.data.error) {
        console.log(response.data.error);
      } else {
        console.log("Server might die");
      }
    });
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <div className="w-full px-3 pt-4 pb-20">
        <div className="w-full flex flex-col gap-2 bg-zinc-200 rounded-md bg-opacity-80 p-2">
          {categories.map((item) => (
            <div
              key={item.id_category}
              className="w-full flex justify-between items-center gap-4 border-b py-1"
            >
              <div>
                <img
                  src={`${baseUrl}/${item.icon}`}
                  alt={item.name}
                  className="w-10 h-10"
                />
              </div>
              <div className="flex flex-col justify-center flex-1">
                <div className="font-semibold text-base">{item.name}</div>
                <div className="font-light text-sm">{item.description}</div>
              </div>
              <div>
                <CiEdit
                  className="text-2xl"
                  onClick={() => alert("function edit category")}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
