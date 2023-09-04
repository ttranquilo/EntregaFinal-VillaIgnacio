import './ItemListContainer.css'
import ListItem from '../ListItem/ListItem';

const ItemListContainer = (props) => {
    return (
        <>
            <h1>
                {props.greeting}
            </h1>
            <div className="catalog__content">
                <ListItem name="Papa" price="600" url = '../src/assets/sample img.png' ></ListItem>
                <ListItem name="Yuca" price="1500" url = '../src/assets/sample img.png' ></ListItem>
                <ListItem name="Tomate" price="2000" url = '../src/assets/sample img.png' ></ListItem>
                <ListItem name="Cebolla" price="200" url = '../src/assets/sample img.png' ></ListItem>
                <ListItem name="Azucar" price="100" url = '../src/assets/sample img.png'  ></ListItem>
            </div>
        </>
    )
}

export default ItemListContainer;