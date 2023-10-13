import { Link } from 'react-router-dom';
import './OrderSummary.css';

const OrderSummary = (props) => {
    // Check if props.orderItems is defined and not an empty array
    if (!props.orderItems || !props.orderItems.items || props.orderItems.items.length === 0) {
        return (
            <div className='summary-container'>
                <p>No items found.</p>
            </div>
        );
    }

    return (
        <div className='summary-container'>
            <h3 className='summary-price'>Order ID: {props.orderID}</h3>
            <div className='summary__container-itemList'>
                {props.orderItems.items.map((item, index) => (
                    <div key={index} className='summary__container-item'>
                        <img className='summary__container--item-image' src={item.image} alt={item.productName} />
                        <strong><p>{item.productName}</p></strong>
                        <p>x{item.quantity}</p>
                        <p>${(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                ))}
            </div>
            <strong><p className='summary-date'>Order date: {props.orderDate}</p></strong>
            <strong><p className='summary-orderTotal'>Order total: ${props.totalPrice.toLocaleString()}</p></strong>

            <Link to={"/"}>
                <button> Back to home </button>
            </Link>
        </div>
    );
};

export default OrderSummary;




