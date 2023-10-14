import { useContext, useEffect, useState } from "react";
import { cartContext } from "../../context/CartContext";
import { authContext } from "../../context/AuthContext";

import CartItem from "../../components/CartItem/CartItem";
import Layout from "../../components/Layout/Layout";
import Swal from 'sweetalert2';
import OrderFinder from "../../components/OrderFinder/OrderFinder";
import { Link, useNavigate, useParams } from "react-router-dom";

const Cart = (props) => {
  const [isLoading, setLoading] = useState(true); //Page state
  const [isClearing, setClearing] = useState(false); // Track cart clearing

  const { loggedIn, userName, email, signOutUser } = useContext(authContext);
  //Get url status
  const { status } = useParams();

  const { cart, displayTotal, makePayment, clearCart } = useContext(cartContext);
  const btnStyle = { width: 300 + "px", height: 60 + "px", fontSize: 22 + "px" };
  const navigate = useNavigate();

  const awaitPayment = async () => {
    if (status === "success" && cart.length > 0) {
      await makePayment().then(() => setTimeout(() => navigate("/checkout"), 1000))
    } else if (status === "success" && cart.length <= 0) {
      navigate("/checkout");
    } else if (status === "success" && cart.length > 0) {
      navigate("/checkout");
    }
  }

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1700);

    // Show loading alert
    Swal.fire({
      title: 'Fetching cart...',
      icon: 'warning',
      showCancelButton: false,
      showCloseButton: false,
      timer: 2000,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

  }, []);

  useEffect(() => {
    awaitPayment();
  }, [status])

  const handleClearCart = () => {
    setClearing(true);
    Swal.fire({
      title: 'Clearing cart...',
      icon: 'warning',
      showCancelButton: false,
      showCloseButton: false,
      timer: 2000,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    //Clear cart after 1700ms to simulate delay
    setTimeout(() => {
      clearCart()
    }, 1700);
  };

  return (
    <Layout>
      <h1>Shopping Cart</h1>
      {loggedIn ? (
  <p>
    Currently purchasing as{" "}
    <span>
      <strong>
        {userName == "none" || userName === "" ? email : userName}
      </strong>
      <a onClick={() => signOutUser()}> sign out</a>
    </span>
  </p>
) : (
  <p></p>
)}
      <div style={{ width: "100%", minHeight: 50 + "vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        {!isLoading ? (
          cart.length > 0 ? (
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
            <OrderFinder>
              <p>Your cart is empty.</p>
              <strong><p>If you already made an order, you can track it here</p></strong>
            </OrderFinder>
          )
        ) : null}
      </div>

      {cart.length > 0 && !isLoading && (
        <>
          <h2>Your total is ${displayTotal()}</h2>
          {!loggedIn ? (
            <>
              <Link to={"/login"}>
                <button
                  className="cart__checkout-Btn"
                  style={btnStyle}
                >
                  Login to pay
                </button>
              </Link>

            </>) : (
            <>
              <Link to={"/checkout/success"}>
                <button
                  className="cart__checkout-Btn"
                  style={btnStyle}
                >
                  Pay now
                </button>
              </Link>

            </>

          )}

          <button
            className="cart__checkout-Btn"
            style={btnStyle}
            onClick={handleClearCart}
          >
            Clear Cart
          </button>
        </>
      )}
    </Layout>
  );
};


export default Cart;