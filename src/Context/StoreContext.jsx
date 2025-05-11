import { createContext, useEffect, useState } from "react";
import { menu_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [food_list, setFoodList] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userToken, setUserToken] = useState(localStorage.getItem("token"));

  const BASE_URL = "http://localhost:3000"; // Replace with your backend URL
  const [userId, setUserId] = useState(
    () => localStorage.getItem("userId") || ""
  );

  const fetchFoodList = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/food/list`);
      const data = await res.json();
      if (data.success) setFoodList(data.data);
    } catch (err) {
      console.error("Failed to fetch food list:", err);
    }
  };

  const fetchCart = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/cart/get`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setCartItems(data.data); // Expecting array of { food_id, quantity }
      }
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  const addToCart = async (foodId) => {
    console.log("Token being sent:", foodId);
    try {
      console.log(JSON.stringify({ userId: userId, itemId: foodId }));
      const res = await fetch(`${BASE_URL}/api/cart/add`, {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        //   token:
        //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzQ2OTAyNTYyLCJleHAiOjE3NDc1MDczNjJ9.6PSMIx9tdaCHKZ0VEu6GfJVxWVC0pCxsMKp3rehLFQI",
        //   //   Authorization: `Bearer ${userToken}`,
        // },
        Headers: {
          "content-type": "application/json",
          token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzQ2OTAyNTYyLCJleHAiOjE3NDc1MDczNjJ9.6PSMIx9tdaCHKZ0VEu6GfJVxWVC0pCxsMKp3rehLFQI`,
        },
        body: JSON.stringify({ userId: parseInt(userId), itemId: foodId }),
      });

      const data = await res.json();
      if (data.success) fetchCart();
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  const removeFromCart = async (foodId) => {
    try {
      const res = await fetch(`${BASE_URL}/api/cart/remove`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({ food_id: foodId }),
      });
      const data = await res.json();
      if (data.success) fetchCart();
    } catch (err) {
      console.error("Error removing from cart:", err);
    }
  };

  const getTotalCartAmount = () => {
    let total = 0;
    cartItems.forEach((item) => {
      const food = food_list.find((f) => f.food_id === item.food_id);
      if (food) total += food.food_price * item.quantity;
    });
    return total;
  };

  useEffect(() => {
    fetchFoodList();
    if (userToken) fetchCart();
    setLoading(false);
  }, [userToken]);

  const contextValue = {
    food_list,
    menu_list,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    loading,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
