import { useContext, useEffect, useState } from "react";
import { cartContext } from "../../context/CartContext";
import CartItem from "../../components/CartItem/CartItem";
import Layout from "../../components/Layout/Layout";
import Swal from 'sweetalert2';
import { Ring } from '@uiball/loaders'



const Checkout = (props) => {

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
          <p> Your cart is empty.</p>
        )

      ) : <Ring
        size={350}
        lineWeight={2}
        speed={2}
        color="white"
      />}




      {cart.length > 0 && !isLoading && (
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