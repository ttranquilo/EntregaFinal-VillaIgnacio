import { useState } from "react";
import { Link } from "react-router-dom";

const OrderFinder = (props) => {

    const [orderID, findID] = useState("not-found");

    return (
        <>
            {props.children}
            <div style={{ display: "flex", flexDirection: "column", width: 20 + "%", justifyContent: "center" }}>
                <input type="text" style={{ height: 30 + "px", textAlign: "center" }} maxLength={5} onInput={(e) => e.target.value = e.target.value.toUpperCase()} onChange={(e) => {
                    findID(e.target.value.toUpperCase())
                }} />

                <Link to={`/order/${orderID}`}>
                    <button> Search </button>
                </Link>

            </div>

        </>
    )
}

export default OrderFinder;