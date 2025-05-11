import React, { useContext, useMemo } from "react";
import "./Cart.css";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, loading, placeOrder } =
    useContext(StoreContext);
  const navigate = useNavigate();

  // Filter out cart items with quantity greater than 0
  const cartItemIds = Object.keys(cartItems || {}).filter(
    (id) => cartItems[id] > 0
  );

  // Calculate cart total dynamically using useMemo
  const cartTotal = useMemo(() => {
    let total = 0;
    cartItemIds.forEach((foodId) => {
      const item = food_list.find((f) => f.id === Number(foodId));
      if (item) total += item.price * cartItems[foodId];
    });
    return total;
  }, [cartItems, food_list, cartItemIds]); // Recalculate when cartItems or food_list change

  // Delivery fee based on cart total
  const deliveryFee = cartTotal === 0 ? 0 : 5;
  const grandTotal = cartTotal + deliveryFee;

  const handlePlaceOrder = () => {
    console.log("Placing order...");
    // You can define deliveryData or pass the necessary information to the placeOrder function.
    const deliveryData = {
      items: cartItems,
      totalAmount: grandTotal,
      deliveryFee: deliveryFee,
      cartTotal: cartTotal,
    };

    // placeOrder(deliveryData); // Call the placeOrder function from context
    navigate("/order"); // Redirect to the order page after placing the order
  };

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p> <p>Title</p> <p>Price</p> <p>Quantity</p> <p>Total</p>{" "}
          <p>Remove</p>
        </div>
        <br />
        <hr />

        {loading ? (
          <p>Loading cart...</p>
        ) : cartItemIds.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItemIds.map((foodId, index) => {
            const item = food_list.find((f) => f.id === Number(foodId));
            if (!item) return null;

            return (
              <div key={index}>
                <div className="cart-items-title cart-items-item">
                  <img
                    src={`http://localhost:3000/uploads/${item.image}`}
                    alt={item.name}
                  />
                  <p>{item.name}</p>
                  <p>₹{item.price}</p>
                  <div>{cartItems[foodId]}</div>
                  <p>₹{item.price * cartItems[foodId]}</p>
                  <p
                    className="cart-items-remove-icon"
                    onClick={() => removeFromCart(item.id)}
                  >
                    x
                  </p>
                </div>
                <hr />
              </div>
            );
          })
        )}
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{cartTotal}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{deliveryFee}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{grandTotal}</b>
            </div>
          </div>
          <button disabled={cartTotal === 0} onClick={handlePlaceOrder}>
            PROCEED TO CHECKOUT
          </button>
        </div>

        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="promo code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
