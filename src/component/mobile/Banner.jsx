import { useEffect, useState } from "react";
import Menu from "./Menu";
import Axios from "axios";

export default function Banner() {
  return (
    <>
      <div className="w-full">
        <div className="w-full min-h-screen py-4 bg-gradient-to-b from-[#22315a] to-[#1f2847] flex flex-col items-center">
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-[#815ee0] to-[#eeadd5] bg-clip-text text-transparent">
            Banner Ads
          </h1>
          <div>
            <Form />
          </div>
          <div className="pb-20">
            <Banners />
          </div>
        </div>
        <Menu />
      </div>
    </>
  );
}

const Form = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [link, setLink] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = () => {
    Axios.post(`${apiUrl}/admin/banner`, {
      title: title,
      url: url,
      link: link,
    }).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else if (response.data.success) {
        alert(response.data.success);
        window.location.reload();
      } else {
        alert("Something went wrong");
      }
    });
  };
  return (
    <>
      <div
        onSubmit={handleSubmit}
        className="w-full py-6 px-6 flex flex-col gap-6"
      >
        <div className="w-full flex flex-col">
          <label htmlFor="name" className="text-zinc-300 text-sm">
            Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className="w-full outline-none py-1 text-white  bg-transparent px-1"
          />
          <div className="h-0.5 rounded-2xl bg-gradient-to-r from-[#815ee0] to-[#eeadd5]"></div>
        </div>
        <div className="w-full flex flex-col">
          <label htmlFor="name" className="text-zinc-300 text-sm">
            Url Image ("Rekomendation 700 * 250")
          </label>
          <input
            type="text"
            id="url"
            placeholder="url"
            value={url}
            required
            onChange={(e) => {
              setUrl(e.target.value);
            }}
            className="w-full outline-none py-1 text-white  bg-transparent px-1"
          />
          <div className="h-0.5 rounded-2xl bg-gradient-to-r from-[#815ee0] to-[#eeadd5]"></div>
        </div>
        <div className="w-full flex flex-col">
          <label htmlFor="number" className="text-zinc-300 text-sm">
            Link
          </label>
          <input
            type="link"
            id="link"
            placeholder="link"
            value={link}
            onChange={(e) => {
              setLink(e.target.value);
            }}
            className="w-full outline-none py-1 text-white  bg-transparent px-1"
          />
          <div className="h-0.5 rounded-2xl bg-gradient-to-r from-[#815ee0] to-[#eeadd5]"></div>
        </div>
        <div className="w-full flex justify-center">
          <button
            className="w-2/3 py-3 text-white font-semibold shadow shadow-black bg-gradient-to-r from-[#45bcfe] to-[#7e54de] rounded-full scale-95 duration-100"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

const Banners = () => {
  const [Banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  const getBanners = async () => {
    setLoading(true);
    try {
      const response = await Axios.get(`${apiUrl}/admin/banner`);
      if (response.data.error) {
        console.log(response.data.error);
      } else {
        setBanners(response.data.result);
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setLoading(false);
    } catch (error) {
      console.log(error, "Errorrrrr");
    }
  };

  useEffect(() => {
    getBanners();
  }, []);

  const handleDelete = (id) => {
    Axios.delete(`${apiUrl}/admin/banner/${id}`).then((response) => {
      if (response.data.error) {
        console.log(response.data.error);
      } else if (response.data.success) {
        getBanners();
      } else {
        console.log("Something Error");
      }
    });
  };

  return (
    <>
      <div className="w-full flex flex-col gap-2 py-3 px-2">
        {loading ? (
          <p className="font-semibold text-sm text-white">Loading</p>
        ) : (
          Banners.map((data) => (
            <div key={data.id_baner} className="w-full flex justify-between items-center gap-1">
              <img
                src={data.url_image}
                alt={data.title}
                className="w-60 h-auto"
              />
              <button
                className="px-2 py-1 rounded-md bg-red-400 text-white font-semibold"
                onClick={() => {
                  handleDelete(data.id_baner);
                }}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );
};
