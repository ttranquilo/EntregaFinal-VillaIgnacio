import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ListItem from '../../components/ListItem/ListItem';
import ItemListContainer from '../../components/ItemListContainer/ItemListContainer';
import Layout from '../../components/Layout/Layout';
import Swal from 'sweetalert2';
import { cartContext } from '../../context/CartContext';
import { db } from '../../db/db';
import { collection, getDocs } from 'firebase/firestore';

const ProductLoader = () => {
  const { setStoreProducts } = useContext(cartContext);

  const [products, setProducts] = useState([]);
  const { id } = useParams();


  const fetchProducts = async () => {
    const itemCollection = collection(db, 'products');

    // Retrieve products from Firestore
    const response = await getDocs(itemCollection);
    const retrievedProducts = response.docs.map((prod) => ({
      id: prod.id,
      ...prod.data(),
    }));
    

    setTimeout(() => {
       // Set retrieved products to the array
    setStoreProducts(retrievedProducts);
    const filteredProducts = id === undefined ? retrievedProducts : retrievedProducts.filter((prod) => prod.category === id);

    // Set the filtered products from a category
    setProducts(filteredProducts);
    }, 1000);
   
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
          // Set the filtered products from a category
    setProducts([]);
        await fetchProducts();
     
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  
    // Show loading alert
    Swal.fire({
      title: 'Please wait',
      icon: 'warning',
      html: 'We are loading the product catalog, please be patient.',
      showCancelButton: false,
      showCloseButton: false,
      timer: 2000,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  }, [id]);

  return (
    <Layout>
      <ItemListContainer>
        {products.map((prod, index) => (
          <ListItem
            key={prod.name + index}
            name={prod.name}
            onSale={prod.saleModifier > 0}
            onStock={prod.stock > 0}
            price={prod.price}
            url={prod.image}
          />
        ))}
      </ItemListContainer>
    </Layout>
  );
};

export default ProductLoader;