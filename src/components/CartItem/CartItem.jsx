import './CartItem.css';
import { Link } from 'react-router-dom';
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
                <Link to={`/product/${name.toLowerCase().replace(/\s+/g, '-')}`}>
                    <img className='cart__item-image' src={url} alt="" />
                </Link>
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