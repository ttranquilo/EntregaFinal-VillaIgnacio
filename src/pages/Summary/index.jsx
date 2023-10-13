import { Link, useParams } from "react-router-dom";
import { cartContext } from "../../context/CartContext";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import { Ring } from '@uiball/loaders'
import { useEffect, useContext, useState } from "react";
import Layout from "../../components/Layout/Layout";

const Summary = () => {
    const { id } = useParams();
    const { findOrderID } = useContext(cartContext);

    const [foundOrder, findOrder] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const resultArray = await findOrderID(id);
                const isEmpty = Array.isArray(resultArray) && resultArray.length === 0;

                // Simulate a delay before showing the data (2 seconds in this example)
                setTimeout(() => {
                    setLoading(false);

                    if (isEmpty) {
                        findOrder([]);
                    } else {
                        findOrder(resultArray);
                     
                    }
                }, 1000); 
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchOrderData();
    }, [id]);

    return (
        <Layout>
            <div style={{ minHeight: 100 + "vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                {isLoading ? (
                    <Ring
                        size={350}
                        lineWeight={2}
                        speed={2}
                        color="white"
                    />
                ) : foundOrder.length <= 0 ? (
                    <>
                        <strong>
                            <p>
                                The specified order does not exist in our database, please check the order ID and try again.
                            </p>
                        </strong>
                        <Link to="/checkout">
                            <button>Back to Cart</button>
                        </Link>
                    </>
                ) : (
                    <>
                        <OrderSummary
                            orderID={id}
                            orderItems={foundOrder[0]}
                            orderDate={
                                new Date(foundOrder[0].orderDate.seconds * 1000).toDateString()
                            }
                            totalPrice={foundOrder[0].total}
                        />
                       
                    </>


                )}
            </div>
        </Layout>
    );
};

export default Summary;