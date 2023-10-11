import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from '../../db/db';
import { collection, getDocs } from 'firebase/firestore';
import Layout from '../../components/Layout/Layout';
import './product_preview.css'
import ItemQuantitySelector from "../../components/ItemQuantitySelector/ItemQuantitySelector";

const Product_preview = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {

            //Look for the collection named "products" on fire store
            const itemCollection = collection(db, 'products');
            // Retrieve products from Firestore
            const response = await getDocs(itemCollection);

            //read the data from the response and store it into a variable
            const retrievedProducts = response.docs.map((prod) => ({
                ...prod.data(),
            }));

            //get the current previewing product from the retrieved products by using the product ID 
            const filteredProduct = retrievedProducts.find((prod) => prod.name.toLowerCase() === productId.replace(/-/g, ' '));
            setProduct(filteredProduct);
        };

        fetchProducts();
    }, [productId]);

    return (
        <Layout>
            {product ? (
                <div className="preview__container">

                    <img src={product.image} className="preview__product--image" alt="" />

                    <div className="preview__product-details">
                        <h1 className="preview__product-name">{product.name}</h1>
                        <strong> <p className="preview__product-stock"> On stock ({product.stock} units left)</p></strong>

                        <p className="preview__product-description"> {product.description}</p>

                        {product.saleModifier > 0 ? (
                            <>
                                <div className="preview__product-badges">
                                    <strong><p className="preview__product-price"> ${product.price - (product.price * product.saleModifier * 0.01)}</p> </strong>
                                    <strong><p className="preview__product-sale"> {product.saleModifier}% Off</p> </strong>
                                </div>
                                <strong><p className="preview__product-salePrice"> ${product.price}</p> </strong>
                            </>

                        ) : (<>
                            <div className="preview__product-badges">
                                <strong><p className="preview__product-price"> ${product.price}</p> </strong>
                            </div>
                        </>)}


                        <div style={{ width: 450 + "px", margin: "auto" }}>
                            <ItemQuantitySelector name={product.name}> </ItemQuantitySelector>
                        </div>

                        <strong><p> Or </p></strong>
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