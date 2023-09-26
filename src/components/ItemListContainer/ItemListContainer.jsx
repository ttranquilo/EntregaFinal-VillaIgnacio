import './ItemListContainer.css'

const ItemListContainer = (props) => {
    return (
        <>
            <h1>
                {props.greeting}
            </h1>
            <div className="catalog__content">
                {props.children}
            </div>
        </>
    )
}

export default ItemListContainer;