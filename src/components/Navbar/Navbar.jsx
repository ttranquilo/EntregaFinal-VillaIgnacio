import './Navbar.css'
import CartWidget from '../CartWidget/CartWidget';

const Navbar = (props) => {
    return (
        <header>
            <div className='navbar'>
                <h1 className='title'>
                    {props.brand}
                </h1>
                <nav>
                    <ul>
                        <a href=""><li> Home</li></a>
                        <a href=""><li> Products</li></a>
                        <a href=""><li> Info</li></a>
                        <a href=""><li> Contact Us</li></a>

                    </ul>
                </nav>

                <CartWidget count="12"></CartWidget>

            </div>
        </header>
    )
}

export default Navbar;