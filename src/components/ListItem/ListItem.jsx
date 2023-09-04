import './ListItem.css'

const ListItem = (props) => {
    return (
        <div className="catalog__content--item">
        <img src= {props.url} alt="" />
        <p id="product__name"> {props.name} </p>
        <p id="product__price"> {props.price}$</p>
        <p className="catalog--quanity-text"> 1 </p>

        <div className="catalog__content--item--buttons">
            <button className="catalog--removeQuantity"> - </button>
            <button className="catalog--addToCart"> Añadir al carrito</button>
            <button className="catalog--addQuantity" > + </button>
        </div>
    </div>
    ) 
}

export default ListItem;