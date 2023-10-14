import './CartItem.css';
import { Link } from 'react-router-dom';
import { cartContext } from '../../context/CartContext';
import { useContext } from 'react';

const CartItem = (props) => {
    const { name, price, discountPrice, quantity, url } = props;
    const { removeFromCart } = useContext(cartContext);

    const handleRemoveClick = () => {
        removeFromCart(name);
    };

    return (
        <>
            <div className="cart__item">
                <Link to={`/product/${name.toLowerCase().replace(/\s+/g, '-')}`}>
                    <img className='cart__item-image' src={url} alt="" />
                </Link>
                <h3 className='cart__item-name'> {name}</h3>
                <div className='cart__item-price-container'>
                    {discountPrice < price ? (<>
                        <p className='cart__item-discountPrice'> ${price}</p>
                        <p className="cart__item-price">${discountPrice}</p>
                    </>
                    ) : (
                        <>
                            <p className="cart__item-price">${discountPrice}</p>
                        </>
                    )}
                </div>

                <strong><p> x{quantity}</p></strong>
                <div className='cart__item-closeBtn'>
                    <button onClick={handleRemoveClick}> X </button>
                </div>
            </div>
        </>
    );
}

export default CartItem;