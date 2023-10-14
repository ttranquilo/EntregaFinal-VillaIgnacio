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
        <div className='summary__container'>
            <h3 className='summary__orderID'>Order ID: {props.orderID}</h3>
            <strong><p className='summary__customerName'>Customer name: {props.customerName}</p></strong>
            <strong><p className='summary__customerEmail'>Customer E-mail: {props.customerEmail}</p></strong>

            <div className='summary__container-labels'>
                <p>Product image</p>
                <p>Product name</p>
                <p>Product quantity</p>
                <p>Product price</p>
            </div>
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

            <strong><p className='summary__date'>Order date: {props.orderDate}</p></strong>
            <strong><p className='summary__orderTotal'>Order total: ${props.totalPrice.toLocaleString()}</p></strong>

            <Link to={"/"}>
                <button> Back to home </button>
            </Link>
        </div>
    );
};

export default OrderSummary;




