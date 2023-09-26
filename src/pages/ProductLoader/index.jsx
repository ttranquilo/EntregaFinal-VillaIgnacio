import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ListItem from '../../components/ListItem/ListItem';
import ItemListContainer from '../../components/ItemListContainer/ItemListContainer';
import Layout from '../../components/Layout/Layout';
import Swal from 'sweetalert2';

const ProductLoader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const { id } = useParams();

  const fetchProducts = async () => {
    try {
      const response = await fetch('/src/data/products.json'); 
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      setTimeout(() => {
      const filteredProducts = id === undefined ? data : data.filter((prod) => prod.category === id);
      setProducts(filteredProducts);
      setIsLoading(false);
      }, 1000)
    } catch (error) {
    
      setIsLoading(false);
    }
  };

  //Fetch products whenever the page id changes
  useEffect(() => {
    setIsLoading(true);
    fetchProducts();
  }, [id]);

  useEffect(() => {
    if (isLoading) {
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
    } else {
      Swal.close();
    }
  }, [isLoading]);

  return (
    <Layout>
      <ItemListContainer>
        {products.map((prod) => (
          <ListItem
            key={prod.name}
            name={prod.name}
            price={prod.price}
            url={prod.image}
          />
        ))}
      </ItemListContainer>
    </Layout>
  );
};

export default ProductLoader;