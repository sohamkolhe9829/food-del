// import React, { useContext, useEffect, useState } from "react";
// import "./PlaceOrder.css";
// import { StoreContext } from "../../Context/StoreContext";
// import { assets } from "../../assets/assets";
// import { useNavigate } from "react-router-dom";

// const PlaceOrder = () => {
//   const [data, setData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     street: "",
//     city: "",
//     state: "",
//     zipcode: "",
//     country: "",
//     phone: "",
//   });

//   const { getTotalCartAmount, placeOrder } = useContext(StoreContext);
//   const [orderSuccess, setOrderSuccess] = useState(false);

//   const navigate = useNavigate();

//   const onChangeHandler = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     setData((data) => ({ ...data, [name]: value }));
//   };

//   const handlePlaceOrder = async () => {
//     try {
//       await placeOrder(data); // assuming placeOrder is a Promise
//       setOrderSuccess(true); // show success popup
//     } catch (error) {
//       console.error("Order failed:", error);
//     }
//   };

//   useEffect(() => {
//     if (getTotalCartAmount() === 0) {
//       navigate("/");
//     }
//   }, []);

//   return (
//     <div className="place-order">
//       {orderSuccess && (
//         <div className="order-success-popup">
//           <div className="popup-content">
//             <img src={assets.tick_icon} alt="Success" />
//             <h2>Order Placed Successfully!</h2>
//             <p>
//               Thank you for your order. You will receive a confirmation email
//               soon.
//             </p>
//             <button onClick={() => navigate("/")}>Go to Home</button>
//           </div>
//         </div>
//       )}

//       <div className="place-order-left">
//         <p className="title">Delivery Information</p>
//         <div className="multi-field">
//           <input
//             type="text"
//             name="firstName"
//             onChange={onChangeHandler}
//             value={data.firstName}
//             placeholder="First name"
//           />
//           <input
//             type="text"
//             name="lastName"
//             onChange={onChangeHandler}
//             value={data.lastName}
//             placeholder="Last name"
//           />
//         </div>
//         <input
//           type="email"
//           name="email"
//           onChange={onChangeHandler}
//           value={data.email}
//           placeholder="Email address"
//         />
//         <input
//           type="text"
//           name="street"
//           onChange={onChangeHandler}
//           value={data.street}
//           placeholder="Street"
//         />
//         <div className="multi-field">
//           <input
//             type="text"
//             name="city"
//             onChange={onChangeHandler}
//             value={data.city}
//             placeholder="City"
//           />
//           <input
//             type="text"
//             name="state"
//             onChange={onChangeHandler}
//             value={data.state}
//             placeholder="State"
//           />
//         </div>
//         <div className="multi-field">
//           <input
//             type="text"
//             name="zipcode"
//             onChange={onChangeHandler}
//             value={data.zipcode}
//             placeholder="Zip code"
//           />
//           <input
//             type="text"
//             name="country"
//             onChange={onChangeHandler}
//             value={data.country}
//             placeholder="Country"
//           />
//         </div>
//         <input
//           type="text"
//           name="phone"
//           onChange={onChangeHandler}
//           value={data.phone}
//           placeholder="Phone"
//         />
//       </div>

//       <div className="place-order-right">
//         <div className="cart-total">
//           <h2>Cart Totals</h2>
//           <div>
//             <div className="cart-total-details">
//               <p>Subtotal</p>
//               <p>₹{getTotalCartAmount()}</p>
//             </div>
//             <hr />
//             <div className="cart-total-details">
//               <p>Delivery Fee</p>
//               <p>₹{getTotalCartAmount() === 0 ? 0 : 5}</p>
//             </div>
//             <hr />
//             <div className="cart-total-details">
//               <b>Total</b>
//               <b>
//                 ₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 5}
//               </b>
//             </div>
//           </div>
//         </div>
//         <div className="payment-options">
//           <h2>Select Payment Method</h2>
//           <div className="payment-option">
//             <img src={assets.selector_icon} alt="" />
//             <p>COD ( Cash On Delivery )</p>
//           </div>
//           <button onClick={handlePlaceOrder}>PLACE ORDER</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PlaceOrder;

// import React, { useContext, useEffect, useState } from "react";
// import "./PlaceOrder.css";
// import { StoreContext } from "../../Context/StoreContext";
// import { assets } from "../../assets/assets";
// import { useNavigate } from "react-router-dom";

// const PlaceOrder = () => {
//   const [data, setData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     street: "",
//     city: "",
//     state: "",
//     zipcode: "",
//     country: "",
//     phone: "",
//   });

//   const { getTotalCartAmount, placeOrder } = useContext(StoreContext);
//   const [orderSuccess, setOrderSuccess] = useState(false);

//   const navigate = useNavigate();

//   const onChangeHandler = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     setData((data) => ({ ...data, [name]: value }));
//   };

//   // const handlePlaceOrder = async () => {
//   //   try {
//   //     // Attempt to place the order
//   //     const result = await placeOrder(data); // assuming placeOrder is a Promise

//   //     if (result.success) {
//   //       setOrderSuccess(true); // Set success state
//   //     } else {
//   //       console.error("Order placement failed:", result.message);
//   //       setOrderSuccess(false); // Handle failure case
//   //     }
//   //   } catch (error) {
//   //     console.error("Order failed:", error);
//   //     setOrderSuccess(false); // Handle error case
//   //   }
//   // };
//   const handlePlaceOrder = async () => {
//     try {
//       const result = await placeOrder(data); // Assuming placeOrder returns a Promise
//       console.log("Order placed successfully:", result); // Debugging line
//       setOrderSuccess(true); // Show success popup
//     } catch (error) {
//       console.error("Order failed:", error);
//       setOrderSuccess(false); // You might want to show an error message here
//     }
//   };

//   useEffect(() => {
//     // If cart is empty, redirect to home
//     if (getTotalCartAmount() === 0) {
//       navigate("/");
//     }
//   }, [getTotalCartAmount(), navigate]);

//   return (
//     <div className="place-order">
//       {orderSuccess && (
//         <div className="order-success-popup">
//           <div className="popup-content">
//             <img src={assets.tick_icon} alt="Success" />
//             <h2>Order Placed Successfully!</h2>
//             <p>
//               Thank you for your order. You will receive a confirmation email
//               soon.
//             </p>
//             <button onClick={() => navigate("/")}>Go to Home</button>
//           </div>
//         </div>
//       )}

//       <div className="place-order-left">
//         <p className="title">Delivery Information</p>
//         <div className="multi-field">
//           <input
//             type="text"
//             name="firstName"
//             onChange={onChangeHandler}
//             value={data.firstName}
//             placeholder="First name"
//           />
//           <input
//             type="text"
//             name="lastName"
//             onChange={onChangeHandler}
//             value={data.lastName}
//             placeholder="Last name"
//           />
//         </div>
//         <input
//           type="email"
//           name="email"
//           onChange={onChangeHandler}
//           value={data.email}
//           placeholder="Email address"
//         />
//         <input
//           type="text"
//           name="street"
//           onChange={onChangeHandler}
//           value={data.street}
//           placeholder="Street"
//         />
//         <div className="multi-field">
//           <input
//             type="text"
//             name="city"
//             onChange={onChangeHandler}
//             value={data.city}
//             placeholder="City"
//           />
//           <input
//             type="text"
//             name="state"
//             onChange={onChangeHandler}
//             value={data.state}
//             placeholder="State"
//           />
//         </div>
//         <div className="multi-field">
//           <input
//             type="text"
//             name="zipcode"
//             onChange={onChangeHandler}
//             value={data.zipcode}
//             placeholder="Zip code"
//           />
//           <input
//             type="text"
//             name="country"
//             onChange={onChangeHandler}
//             value={data.country}
//             placeholder="Country"
//           />
//         </div>
//         <input
//           type="text"
//           name="phone"
//           onChange={onChangeHandler}
//           value={data.phone}
//           placeholder="Phone"
//         />
//       </div>

//       <div className="place-order-right">
//         <div className="cart-total">
//           <h2>Cart Totals</h2>
//           <div>
//             <div className="cart-total-details">
//               <p>Subtotal</p>
//               <p>₹{getTotalCartAmount()}</p>
//             </div>
//             <hr />
//             <div className="cart-total-details">
//               <p>Delivery Fee</p>
//               <p>₹{getTotalCartAmount() === 0 ? 0 : 5}</p>
//             </div>
//             <hr />
//             <div className="cart-total-details">
//               <b>Total</b>
//               <b>
//                 ₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 5}
//               </b>
//             </div>
//           </div>
//         </div>
//         <div className="payment-options">
//           <h2>Select Payment Method</h2>
//           <div className="payment-option">
//             <img src={assets.selector_icon} alt="" />
//             <p>COD ( Cash On Delivery )</p>
//           </div>
//           <button onClick={handlePlaceOrder}>PLACE ORDER</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PlaceOrder;

import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../Context/StoreContext";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const { getTotalCartAmount, placeOrder } = useContext(StoreContext);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const handlePlaceOrder = async () => {
    try {
      // Attempt to place the order
      await placeOrder(data); // Pass delivery info to placeOrder
      console.log("Order placed successfully!"); // Debugging log
      setOrderSuccess(true); // Set success flag to true
      setTimeout(() => {
        navigate("/"); // Navigate to home after a short delay (optional)
      }, 2000); // 2-second delay
    } catch (error) {
      console.error("Order failed:", error);
      setOrderSuccess(false); // Handle failure state (optional)
    }
  };

  useEffect(() => {
    if (getTotalCartAmount() === 0) {
      navigate("/"); // Navigate to home if cart is empty
    }
  }, [getTotalCartAmount(), navigate]);

  return (
    <div className="place-order">
      {orderSuccess && (
        <div className="order-success-popup">
          <div className="popup-content">
            <img src={assets.tick_icon} alt="Success" />
            <h2>Order Placed Successfully!</h2>
            <p>
              Thank you for your order. You will receive a confirmation email
              soon.
            </p>
            <button onClick={() => navigate("/")}>Go to Home</button>
          </div>
        </div>
      )}

      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-field">
          <input
            type="text"
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            placeholder="First name"
          />
          <input
            type="text"
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            placeholder="Last name"
          />
        </div>
        <input
          type="email"
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          placeholder="Email address"
        />
        <input
          type="text"
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          placeholder="Street"
        />
        <div className="multi-field">
          <input
            type="text"
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            placeholder="City"
          />
          <input
            type="text"
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            placeholder="State"
          />
        </div>
        <div className="multi-field">
          <input
            type="text"
            name="zipcode"
            onChange={onChangeHandler}
            value={data.zipcode}
            placeholder="Zip code"
          />
          <input
            type="text"
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            placeholder="Country"
          />
        </div>
        <input
          type="text"
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          placeholder="Phone"
        />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 5}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 5}
              </b>
            </div>
          </div>
        </div>
        <div className="payment-options">
          <h2>Select Payment Method</h2>
          <div className="payment-option">
            <img src={assets.selector_icon} alt="" />
            <p>COD ( Cash On Delivery )</p>
          </div>
          <button onClick={handlePlaceOrder}>PLACE ORDER</button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
