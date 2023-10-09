import { createContext, useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const cartContext = createContext();


const CartContextProvider = (props) => {
    const toastId = useRef(null);
    const productCount = useRef(1); // Initialize the count to 1

    const [storeProducts, setStoreProducts] = useState([]);
    const [cart, setCart] = useState(localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [])

    const addToCart = (item) => {

        const productExists = cart.find((cartItem) => cartItem.name === item.name);
        if (toastId.current !== null && item.name.toLowerCase() == toastId.current.itemName) {
            productCount.current += item.quantity;

            toast.update(toastId.current.id, {
                render: `Added product "${item.name.toLowerCase()}" successfully x${productCount.current}`,
                type: toast.TYPE.SUCCESS,
                autoClose: 2000,
                hideProgressBar: true,
            });
        } else {
            // Show a new toast for a different product or the first click
            productCount.current = item.quantity; // Reset the count
            toastId.current = {
                id: toast.success(`Added product "${item.name.toLowerCase()}" successfully x${productCount.current}`, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                    hideProgressBar: true,
                }),
                itemName: item.name.toLowerCase(), // Store the current product name
            };
        }

        //If a product exists on the cart, update it's quantity instead of adding it more than necessary
        if (productExists) {
            setCart(cart.map((cartItem) => cartItem.name === item.name ? { ...cartItem, quantity: cartItem.quantity + item.quantity } : cartItem))

        } else {
            // if the item is not in the cart, add the item to the cart with the desired quantity
            setCart([...cart, { ...item, quantity: item.quantity }]);
        }
    }

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cart));
    }
        , [cart])

    useEffect(() => {
        const cartItems = localStorage.getItem("cartItems");
        if (cartItems) {
            setCart(JSON.parse(cartItems));
        }
    }, []);

    const removeFromCart = (item) => {
        //Remove the specified item
        const updatedCart = cart.filter((cartItem) => cartItem.name !== item);

        // Set the cart state with the updated cart array
        setCart(updatedCart);
    };

    const clearCart = () => {
        //Set the cart state to an empty array
        setCart([]);
        cart.splice(0, cart.length);
    }

    // calculate the total price of the items in the cart
    const displayTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0).toLocaleString();
    }

    const makePayment = () => {
        Swal.fire({
            title: 'Processing payment, please wait',
            icon: 'warning',

            showCancelButton: false,
            showCloseButton: false,
            timer: 2000,
            didOpen: () => {
                Swal.showLoading();
            },
            //Clear cart after paying  
        }).then(() => {
            // Show loading alert
            Swal.fire({
                title: '¡Payment done succesfully!',
                icon: 'success',
                html: `Thanks for your purchase, your order will arrive to your adress soon. Your order ID is <strong>${generateOrderToken(5).toUpperCase()}</strong>`,
            })

            clearCart();
        })
    }

    const generateOrderToken = (length) => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }

    return (
        <cartContext.Provider value={{ storeProducts, setStoreProducts, cart, setCart, addToCart, removeFromCart, clearCart, displayTotal, makePayment }}>
            {props.children}
            <ToastContainer />
        </cartContext.Provider>
    );
}

export default CartContextProvider;