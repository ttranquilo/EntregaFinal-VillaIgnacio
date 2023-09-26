import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Layout = (props) => {
    return (
        <div>
            <Navbar brand="Improvised Store" />
            {props.children}
            <Footer/>
        </div>

    )
}

export default Layout;