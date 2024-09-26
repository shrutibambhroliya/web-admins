import React, { useEffect, useState } from "react";
import "boxicons/css/boxicons.min.css";
import AddItems from "../Components/AddItems";
import ListItems from "../Components/ListItems";
import Orders from "../Components/Orders";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [activeLink, setActiveLink] = useState("");
  const navigate = useNavigate();

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const renderComponents = () => {
    switch (activeLink) {
      case "addItems":
        return <AddItems />;
      case "listItems":
        return <ListItems />;
      case "orders":
        return <Orders />;
      default:
        return;
    }
  };

  const logOut = async () => {
    try {
      localStorage.clear();
      navigate("/Login");
      alert("logOut successfully!!");
    } catch (error) {
      console.log("error during logout", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/Login");
    }
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center px-[50px] border-2 border-gray-200 py-[7px]">
        <img
          src="https://admin.foreverbuy.in/assets/logo-BI5h54w2.png"
          alt=""
          className="w-[130px]"
        />
        <button
          onClick={logOut}
          className="px-7 py-[7px] rounded-full text-[#fff] bg-gray-600 font-semibold border-b"
        >
          Logout
        </button>
      </div>
      <div className="flex w-full">
        <div className="w-[20%] min-h-screen border-r-2">
          <div className="flex flex-col pt-6 gap-4 text-[15px] pl-[20%]">
            <a
              className={`flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1 ${
                activeLink === "addItems"
                  ? "bg-[#FFEBF5] border border-pink-400"
                  : ""
              }`}
              href="#"
              onClick={() => handleLinkClick("addItems")}
            >
              <i className="bx bx-plus-circle text-[25px]"></i>
              <p>Add items</p>
            </a>
            <a
              className={`flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1 ${
                activeLink === "listItems"
                  ? "bg-[#FFEBF5] border border-pink-400"
                  : ""
              }`}
              href="#"
              onClick={() => handleLinkClick("listItems")}
            >
              <i className="bx bx-list-check text-[25px]"></i>
              <p>List Items</p>
            </a>
            <a
              className={`flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1 ${
                activeLink === "orders"
                  ? "bg-[#FFEBF5] border border-pink-400"
                  : ""
              }`}
              href="#"
              onClick={() => handleLinkClick("orders")}
            >
              <i className="bx bx-list-check text-[25px]"></i>
              <p>Orders</p>
            </a>
          </div>
        </div>
        <div className="w-[80%]">{renderComponents()}</div>
      </div>
    </div>
  );
};

export default HomePage;