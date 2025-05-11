import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./MyOrders.css";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [foodList, setFoodList] = useState([]);
  const [loading, setLoading] = useState(false);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const url = "http://localhost:3000"; // Replace with your base URL
  const currency = "₹";

  const fetchAllOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${url}/api/order/userorders`,
        { userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setOrders(response.data.data.reverse());
      } else {
        toast.error("Error fetching orders.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Network error while fetching orders.");
    } finally {
      setLoading(false);
    }
  };

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setFoodList(response.data.data);
      } else {
        toast.error("Failed to fetch food list.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Network error while fetching food list.");
    }
  };

  useEffect(() => {
    if (!userId || !token) {
      toast.error("User not logged in");
      return;
    }
    fetchAllOrders();
    fetchFoodList();
  }, []);

  const getFoodName = (id) => {
    const found = foodList.find((f) => f.id == id || f._id === id);
    return found?.name || "Unknown";
  };

  return (
    <div className="my-order">
      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="order-list">
          {orders.map((order, index) => (
            <div key={index} className="order-item">
              <div>
                <p className="order-item-food">
                  {order.items.map((item, i) => (
                    <span key={i}>
                      {getFoodName(item.foodId)} x {item.quantity}
                      {i < order.items.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
                <p className="order-item-name">
                  {order.firstName} {order.lastName}
                </p>
                <p className="order-item-address">{order.address}</p>
                <p className="order-item-phone">{order.phone}</p>
              </div>
              <div>
                <p>Items: {order.items.length}</p>
                <p>
                  Total: {currency}
                  {order.amount}
                </p>
                <p>Status: {order.status}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
