import React, { useEffect, useState } from "react";

const ListItems = ({ setLoading }) => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      // const token = localStorage.getItem("token");
      // if (!token) {
      //   alert("please logged in your account!");
      //   return;
      // }
      setLoading(true);
      try {
        const response = await fetch(
          "http://localhost:4000/api/a1/products/getAllProducts",
          {
            method: "GET",
            // headers: {
            //   Authorization: `Bearer ${token}`,
            // },
          }
        );
        if (!response.ok) {
          console.log("data not fetched successfully!");
          return;
        }

        const data = await response.json();
        console.log("data", data.data);
        setProductList(data.data);
      } catch (error) {
        alert("product data not fetched successfully!");
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      }
    };
    fetchProducts();
  }, []);

  const deleteProduct = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("please logged in account!");
      return;
    }

    const role = localStorage.getItem("role");
    if (role !== "admin") {
      alert("only admin role allow for delete category!!");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:4000/api/a1/products/d/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        console.log("deleted successfully");
        setProductList(
          productList.filter((product) => product._id !== productId)
        );
      }
    } catch (error) {
      console.log("error in remove product");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  };

  return (
    <div className="px-[75px] py-[30px]">
      <h2 className="text-gray-600 font-sans font-medium text-[18px] outfit-uniqueClass mb-2">
        All Product list
      </h2>
      <div className="">
        <div className="flex flex-col gap-2 ">
          <div className=" grid grid-cols-6 gap-4 text-left outfit-uniqueClass text-[#4B5563] text-sm bg-gray-100 py-1 px-2 ">
            <b>Image</b>
            <b className="text-center">Name</b>
            <b className="text-center">Description</b>
            <b className="text-center">Category</b>
            <b className="text-center">Price</b>
            <b className="text-center">Action</b>
          </div>

          <div className="flex flex-col gap-2">
            {productList.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-6 gap-4 text-left outfit-uniqueClass text-[#4B5563]  items-center py-1 px-2 border text-sm"
              >
                <div>
                  <img src={item.images[0]} alt="preview" className="w-12" />
                </div>
                <div className="text-center">{item.name}</div>
                <div className="text-center">{item.description}</div>
                <div className="text-center">
                  {item.category.parentCategory}
                </div>
                <div className="text-center">${item.price}</div>
                <div
                  onClick={() => deleteProduct(item._id)}
                  className="text-center "
                >
                  <i className="bx bx-x text-[25px] "></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListItems;
