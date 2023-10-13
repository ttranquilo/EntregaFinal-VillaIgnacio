import { useContext, useEffect, useState } from "react";
import { cartContext } from "../../context/CartContext";
import CartItem from "../../components/CartItem/CartItem";
import Layout from "../../components/Layout/Layout";
import Swal from 'sweetalert2';
import { Ring } from '@uiball/loaders'
import OrderFinder from "../../components/OrderFinder/OrderFinder";


const Cart = (props) => {

  const [isLoading, setLoading] = useState(false);

  const { cart, displayTotal, makePayment, clearCart } = useContext(cartContext);
  const btnStyle = { width: 300 + "px", height: 60 + "px", fontSize: 22 + "px" };

  useEffect(() => {

    //Sets up a loading state for the cart page
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
      didOpen: () => {
        Swal.showLoading();
      },
    });
  }, []);

  return (
    <Layout>
      <h1> Shopping cart</h1>
      <div style={{ width:"100%", minHeight: 50 + "vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
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
              <p> Your cart is empty.</p>
              <strong><p> If you already made an order, you can track it here </p></strong>
            </OrderFinder>

            
          )
        ) : <Ring
          size={350}
          lineWeight={2}
          speed={2}
          color="white"
        />}
      </div>

      {cart.length > 0 && !isLoading && (
        <>
          <h2> Your total is ${displayTotal()} </h2>
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
        </>
      )}
    </Layout>
  );
};

export default Cart;