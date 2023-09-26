import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from '../../components/Layout/Layout';
import './product_preview.css'

const Product_preview = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/src/data/products.json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const filteredProduct = data.find((prod) => prod.name.toLowerCase() === productId);

                setProduct(filteredProduct);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchProducts();
    }, [productId]);

    return (
        <Layout>
            <h1>Product preview page</h1>
            {product ? (
                <div>
                    <h2>{product.name} (${product.price})</h2>
                    <img src={product.image} className="preview__product--image" alt="" />
                    <div>
                        <h3> Description </h3>
                        <p> {product.description}</p>
                        <Link to={`/category/${product.category}`}>

                            <button> Return to "{product.category}" category</button>

                        </Link>
                    </div>
                </div>
            ) : (
                <p>Loading product...</p>
            )}
        </Layout>
    );
}

export default Product_preview;