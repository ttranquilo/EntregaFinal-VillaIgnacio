import { useContext } from "react";
import { cartContext } from "../../context/CartContext";
import CartItem from "../../components/CartItem/CartItem";
import Layout from "../../components/Layout/Layout";

const Checkout = (props) => {
  const { cart, displayTotal, makePayment, clearCart } = useContext(cartContext);
  const btnStyle = { width: 300 + "px", height: 60 + "px", fontSize: 22 + "px" };

  return (
    <Layout>
      {cart.length > 0 ? (
        cart.map((item, index) => (
          <CartItem
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            url={item.image}
            key={item.name + index}
          />
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}

      {cart.length > 0 && (
        <div>

          <h2> Your total is {displayTotal()} </h2>
          <button
            className="cart__checkout-Btn"
            style={btnStyle}
            onClick={makePayment}
          >
            Pay now
          </button>

          <button
            className="cart__checkout-Btn"
            style={btnStyle}
            onClick={clearCart}
          >
            Clear Cart
          </button>
        </div>
      )}
    </Layout>
  );
};

export default Checkout;