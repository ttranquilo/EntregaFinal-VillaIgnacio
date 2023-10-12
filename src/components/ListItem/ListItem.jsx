import { Link } from 'react-router-dom';
import './ListItem.css';
import ItemQuantitySelector from '../ItemQuantitySelector/ItemQuantitySelector';

const ListItem = (props) => {
  const { name, price, url, onSale, onStock } = props;

  return (
    <div className="item__content">
      <div className='item__content--image-container'>
        <img src={url} alt="" />
        {onSale && onStock ? (
          <div className='item__content--image-badge'>
            <strong><p> On sale!</p></strong>
          </div>
        ) : (<>
        </>)}

        <Link to={`/product/${name.toLowerCase().replace(/\s+/g, '-')}`}>
          <button className="item__content-previewBtn">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="white" viewBox="0 0 576 512"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" /></svg>
          </button>
        </Link>
      </div>

      <p id="item__name"> {name} </p>
      <strong><p id={onStock ? "item__stock-available" : "item__stock-not-available"}> {onStock ? "On stock" : "Out of stock"}</p></strong>
      <p id="item__price"> ${price.toLocaleString()}</p>

      {onStock ? (
        <ItemQuantitySelector name={name} orientation={""}></ItemQuantitySelector>
      ) : (
        <>
        </>
      )}

    </div>
  );
}

export default ListItem;