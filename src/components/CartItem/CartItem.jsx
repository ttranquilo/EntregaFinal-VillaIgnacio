import './CartItem.css';
import { cartContext } from '../../context/CartContext';
import { useContext } from 'react';

const CartItem = (props) => {
    const { name, price, quantity, url } = props;
    const { removeFromCart } = useContext(cartContext);

    const handleRemoveClick = () => {
        removeFromCart(name);
    };

    return (
        <div>
            <div className="cart__item">
                <img className='cart__item-image' src={url} alt="" />
                <h3> {name}</h3>
                <div>
                </div>
                <div className='cart__item-info'>
                    <p> product price : ${price}</p>
                    <p> product quantity : {quantity}</p>
                </div>
                <div className='cart__item-closeBtn'>
                    <button onClick={handleRemoveClick}> X </button>
                </div>
            </div>
        </div>
    );
}

export default CartItem;