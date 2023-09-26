import './Navbar.css'
import CartWidget from '../CartWidget/CartWidget';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
    return (
        <header>
            <div className='navbar'>
                <h1 className='title'>
                    <Link to='/home'>{props.brand}</Link>
                </h1>
                <nav>
                    <ul>
                    <Link to='/home'><li> All</li></Link>
                    <Link to='/category/vegetables'><li> Vegetables</li></Link>
                    <Link to='/category/beverages'><li> Beverages</li></Link>
                    <Link to='/category/snacks'><li> Snacks</li></Link>
                    </ul>
                </nav>

                <CartWidget count="12"></CartWidget>

            </div>
        </header>
    )
}

export default Navbar;