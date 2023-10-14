import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from '../../db/db';
import { collection, getDocs } from 'firebase/firestore';
import { Ring } from '@uiball/loaders'

import Layout from '../../components/Layout/Layout';
import './product_preview.css'
import ItemQuantitySelector from "../../components/ItemQuantitySelector/ItemQuantitySelector";

const Product_preview = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setTimeout(async () => {
                try {
                    // Look for the collection named "products" on Firestore
                    const itemCollection = collection(db, 'products');
                    // Retrieve products from Firestore
                    const response = await getDocs(itemCollection);

                    // Read the data from the response and store it into a variable
                    const retrievedProducts = response.docs.map((prod) => ({
                        ...prod.data(),
                    }));

                    // Get the current previewing product from the retrieved products by using the product ID 
                    const filteredProduct = retrievedProducts.find((prod) => prod.name.toLowerCase() === productId.replace(/-/g, ' '));

                    if (filteredProduct) {
                        setProduct(filteredProduct);
                    }
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            }, 1000);
        };

        fetchProducts();
    }, [productId]);

    return (
        <Layout>
            {loading ? (
                <div style={{ minHeight: 100 + "vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <h2 > Loading product...</h2>
                    <Ring
                        size={350}
                        lineWeight={2}
                        speed={2}
                        color="white"
                    />
                </div>

            ) : product ? (
                <div className="preview__container">
                    <img src={product.image} className="preview__product--image" alt="" />

                    <div className="preview__product-details">
                        <h1 className="preview__product-name">{product.name}</h1>
                        <strong>
                            <p className={
                                product.stock > 0
                                    ? product.stock > 10
                                        ? "preview__product-hasStock"
                                        : "preview__product-stockSoon"
                                    : "preview__product-noStock"
                            }>
                                {product.stock > 0
                                    ? `On stock (${product.stock} units left${product.stock <= 10 ? ", order soon!" : ""
                                    })
                                `
                                    : "Out of stock"}
                            </p>
                        </strong>

                        <p className="preview__product-description"> {product.description}</p>

                        {product.saleModifier > 0 && product.stock > 0 ? (
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
                            {product.stock > 0 ? (
                                <>
                                    <ItemQuantitySelector name={product.name} orientation={"horizontal"}> </ItemQuantitySelector>
                                    <strong><p> Or </p></strong>
                                </>

                            ) : (
                                <h3> Out of stock, come back another time</h3>
                            )}

                        </div>


                        <Link to={`/category/${product.category}`}>
                            <button> Return to "{product.category}" category</button>
                        </Link>
                    </div>
                </div>
            ) : (
                <div style={{ minHeight: 100 + "vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <h2 > Product not found </h2>
                    <Link to={"/"}>
                        <button> Return to home </button>
                    </Link>
                </div>

            )}
        </Layout>
    );
}

export default Product_preview;