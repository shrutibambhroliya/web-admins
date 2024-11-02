import React, { useEffect, useState } from "react";

const Orders = () => {
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("please logged in your account!!");
      return;
    }

    const orderItemList = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/a1/order/getUserOrder",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          console.log("order list data not fetched successfully!!");
        }
        const data = await response.json();
        console.log("orderItem", data.data);
        setOrderList(data.data);
      } catch (error) {
        console.log("order list not fetches!");
      }
    };

    orderItemList();
  }, []);

  return (
    <div>
      <div>
        {orderList.map((item, index) => (
          <div key={index}>
            <div>{item.shippingAddress.address}</div>
            <div>
              {item.cart.cartItem.map((item) => (
                <div>{item.product.name}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
