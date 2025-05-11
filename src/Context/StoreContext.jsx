// import { createContext, useEffect, useState } from "react";
// import { menu_list } from "../assets/assets";

// export const StoreContext = createContext(null);

// const StoreContextProvider = (props) => {
//   const [food_list, setFoodList] = useState([]);
//   const [cartItems, setCartItems] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [userToken, setUserToken] = useState(localStorage.getItem("token"));
//   const [userId, setUserId] = useState(localStorage.getItem("userId") || "");

//   const BASE_URL = "http://localhost:3000";

//   const fetchFoodList = async () => {
//     try {
//       const res = await fetch(`${BASE_URL}/api/food/list`);
//       const data = await res.json();
//       if (data.success) setFoodList(data.data);
//     } catch (err) {
//       console.error("Failed to fetch food list:", err);
//     }
//   };

//   const fetchCart = async () => {
//     try {
//       if (!userId) return;

//       const res = await fetch(`${BASE_URL}/api/cart/get`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${userToken}`,
//         },
//         body: JSON.stringify({ userId }),
//       });

//       const data = await res.json();
//       if (data.success) {
//         if (typeof data.cartData === "object" && data.cartData !== null) {
//           setCartItems(data.cartData);
//         } else {
//           console.warn("Invalid cart data format:", data.cartData);
//           setCartItems({});
//         }
//       } else {
//         console.warn("Cart fetch failed:", data.message);
//       }
//     } catch (error) {
//       console.error("Error loading cart:", error);
//     }
//   };

//   const addToCart = async (foodId) => {
//     try {
//       const res = await fetch(`${BASE_URL}/api/cart/add`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${userToken}`,
//         },
//         body: JSON.stringify({ userId: parseInt(userId), itemId: foodId }),
//       });

//       const data = await res.json();
//       if (data.success) {
//         setCartItems((prev) => ({
//           ...prev,
//           [foodId]: (prev[foodId] || 0) + 1,
//         }));
//       }
//     } catch (err) {
//       console.error("Error adding to cart:", err);
//     }
//   };

//   const removeFromCart = async (foodId) => {
//     try {
//       const res = await fetch(`${BASE_URL}/api/cart/remove`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${userToken}`,
//         },
//         body: JSON.stringify({ userId: parseInt(userId), itemId: foodId }),
//       });

//       const data = await res.json();
//       if (data.success) {
//         setCartItems((prev) => {
//           const updated = { ...prev };
//           if (updated[foodId] > 1) {
//             updated[foodId] -= 1;
//           } else {
//             delete updated[foodId];
//           }
//           return updated;
//         });
//       }
//     } catch (err) {
//       console.error("Error removing from cart:", err);
//     }
//   };

//   const getTotalCartAmount = () => {
//     let total = 0;
//     Object.keys(cartItems).forEach((itemId) => {
//       const food = food_list.find((f) => f.id === Number(itemId));
//       if (food) total += food.price * cartItems[itemId];
//     });
//     return total;
//   };

//   // Adding the placeOrder function
//   const placeOrder = async (deliveryData) => {
//     try {
//       const orderData = {
//         userId: parseInt(userId),
//         items: Object.keys(cartItems).map((itemId) => ({
//           foodId: itemId,
//           quantity: cartItems[itemId],
//         })),
//         totalAmount: getTotalCartAmount(),
//         deliveryData,
//       };

//       const res = await fetch(`${BASE_URL}/api/order/place`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${userToken}`,
//         },
//         body: JSON.stringify(orderData),
//       });

//       const data = await res.json();
//       if (data.success) {
//         // Handle success (e.g., navigate to order page or show a confirmation)
//         console.log("Order placed successfully", data);
//         setOrderSuccess(true);
//         // Navigate to the order page or show a confirmation
//       } else {
//         console.error("Order placement failed:", data.message);
//       }
//     } catch (err) {
//       console.error("Error placing order:", err);
//     }
//   };

//   useEffect(() => {
//     fetchFoodList();
//     setLoading(false);
//   }, []);

//   useEffect(() => {
//     if (userToken && userId) {
//       fetchCart();
//     }
//   }, [userToken, userId]);

//   const contextValue = {
//     food_list,
//     menu_list,
//     cartItems,
//     addToCart,
//     removeFromCart,
//     getTotalCartAmount,
//     loading,
//     placeOrder, // Add placeOrder to context
//   };

//   return (
//     <StoreContext.Provider value={contextValue}>
//       {props.children}
//     </StoreContext.Provider>
//   );
// };

// export default StoreContextProvider;

import { createContext, useEffect, useState } from "react";
import { menu_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [food_list, setFoodList] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [userToken, setUserToken] = useState(localStorage.getItem("token"));
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");

  const BASE_URL = "http://localhost:3000";

  // Fetch food list
  const fetchFoodList = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/food/list`);
      const data = await res.json();
      if (data.success) setFoodList(data.data);
    } catch (err) {
      console.error("Failed to fetch food list:", err);
    }
  };

  // Fetch user's cart
  const fetchCart = async () => {
    try {
      if (!userId) return;

      const res = await fetch(`${BASE_URL}/api/cart/get`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({ userId }),
      });

      const data = await res.json();
      if (data.success) {
        if (typeof data.cartData === "object" && data.cartData !== null) {
          setCartItems(data.cartData);
        } else {
          console.warn("Invalid cart data format:", data.cartData);
          setCartItems({});
        }
      } else {
        console.warn("Cart fetch failed:", data.message);
      }
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  };

  // Add food item to the cart
  const addToCart = async (foodId) => {
    try {
      const res = await fetch(`${BASE_URL}/api/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({ userId: parseInt(userId), itemId: foodId }),
      });

      const data = await res.json();
      if (data.success) {
        setCartItems((prev) => ({
          ...prev,
          [foodId]: (prev[foodId] || 0) + 1,
        }));
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  // Remove food item from the cart
  const removeFromCart = async (foodId) => {
    try {
      const res = await fetch(`${BASE_URL}/api/cart/remove`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({ userId: parseInt(userId), itemId: foodId }),
      });

      const data = await res.json();
      if (data.success) {
        setCartItems((prev) => {
          const updated = { ...prev };
          if (updated[foodId] > 1) {
            updated[foodId] -= 1;
          } else {
            delete updated[foodId];
          }
          return updated;
        });
      }
    } catch (err) {
      console.error("Error removing from cart:", err);
    }
  };

  // Calculate total cart amount
  const getTotalCartAmount = () => {
    let total = 0;
    Object.keys(cartItems).forEach((itemId) => {
      const food = food_list.find((f) => f.id === Number(itemId));
      if (food) total += food.price * cartItems[itemId];
    });
    return total;
  };
  // Place an order
  const placeOrder = async (deliveryData) => {
    try {
      const orderData = {
        userId: parseInt(userId),
        items: Object.keys(cartItems).map((itemId) => ({
          foodId: itemId,
          quantity: cartItems[itemId],
        })),
        totalAmount: getTotalCartAmount(),
        deliveryData,
      };
      const res = await fetch(`${BASE_URL}/api/order/place`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();
      if (data.success) {
        // Handle success (e.g., navigate to order page or show a confirmation)
        console.log("Order placed successfully", data);

        // You can update state or navigate to the order confirmation page
      } else {
        console.error("Order placement failed:", data.message);
      }
    } catch (err) {
      console.error("Order placement failed:", err.message || err);
      console.error("Error placing order:", err);
    }
  };
  // Update token and userId
  const updateUserSession = (token, id) => {
    setUserToken(token);
    setUserId(id);
    // Save to localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("userId", id);
  };

  // Effect to fetch food list initially
  useEffect(() => {
    fetchFoodList();
    setLoading(false);
  }, []);

  // Effect to fetch cart data whenever userToken or userId changes
  useEffect(() => {
    if (userToken && userId) {
      fetchCart();
    }
  }, [userToken, userId]);

  // Expose the updateUserSession to be called directly upon successful login
  const contextValue = {
    food_list,
    menu_list,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    loading,
    placeOrder, // Expose placeOrder to context
    updateUserSession, // Expose updateUserSession to context
    userToken,
    userId,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
