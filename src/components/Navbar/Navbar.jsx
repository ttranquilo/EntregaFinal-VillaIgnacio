import './Navbar.css'
import CartWidget from '../CartWidget/CartWidget';
import { Link } from 'react-router-dom';
import { cartContext } from '../../context/CartContext';
import { useContext } from 'react';

const Navbar = (props) => {

    const {cart} = useContext(cartContext);

    return (
        <header>
            <div className='navbar'>
                <h1 className='title'>
                    <Link to='/'>{props.brand}</Link>
                </h1>
                <nav>
                    <ul>
                    <Link to='/'><li> All</li></Link>
                    <Link to='/category/vegetables'><li> Vegetables</li></Link>
                    <Link to='/category/beverages'><li> Beverages</li></Link>
                    <Link to='/category/snacks'><li> Snacks</li></Link>
                    </ul>
                </nav>
                <Link to='/checkout'>
                <CartWidget count= {cart.length}></CartWidget>
                </Link>

            </div>
        </header>
    )
}

export default Navbar;