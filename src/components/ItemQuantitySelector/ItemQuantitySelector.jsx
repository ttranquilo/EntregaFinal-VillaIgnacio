import { useContext, useState } from 'react';
import { cartContext } from '../../context/CartContext';
import './ItemQuantitySelector.css'

const ItemQuantitySelector = (props) => {

    const { storeProducts, addToCart } = useContext(cartContext)
    const { name } = props;
    const [quantity, setQuantity] = useState(1)

    const addCustomQuantity = (value) => {
        if (value.trim() === "") {
            setQuantity(1);
        } else if (!isNaN(value)) {
            setQuantity(parseInt(value));
        }
    };

    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const processItem = (name) => {
        const productToAdd = storeProducts.find((prod) => prod.name === name);
        productToAdd.quantity = quantity;
        addToCart(productToAdd)
    };

    return (
        <>
            <input
                type='number'
                className="quantity-text"
                value={quantity}

                onBlur={(e) => {
                    if (e.target.value.trim() === "") {
                        // When input is empty, set the quantity to 1.
                        setQuantity(1);
                    }
                }}

                onChange={(e) => {
                    // Limit the input value to 3 characters
                    if (e.target.value.length <= 3) {
                        addCustomQuantity(e.target.value);
                    }
                }}
            />
            <div className="quantity__buttons-container">
                <button className="quantity__removeQuantity-btn" onClick={decrementQuantity}> - </button>
                <button className="quantity__addToCart-btn" onClick={() => processItem(name)}> Add to cart </button>
                <button className="quantity__addQuantity-btn" onClick={incrementQuantity}> + </button>
            </div>
        </>
    );
}

export default ItemQuantitySelector;