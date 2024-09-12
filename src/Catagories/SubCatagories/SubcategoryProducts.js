import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import Layout from '../../include/Layout';
import './subcategoryProducts.css';
import Catagories from '../Catagories';

function SubcategoryProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(''); // Error state
  const location = useLocation();
  const { subcategory } = location.state || {};

  useEffect(() => {
    if (subcategory) {
      fetchProductsBySubcategory(subcategory);
    }
  }, [subcategory]);

  const fetchProductsBySubcategory = async (subcategory) => {
    try {
      setLoading(true); // Start loading
      const response = await axios.get(`http://localhost:8090/products/${subcategory}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products by subcategory:', error);
      setError('Failed to load products. Please try again later.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <Layout>
      <Catagories/>
      <div className="subcategory-products-container">
        <h2 className="subcategory-title">{subcategory} Products</h2>
        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <img
                  src={`${process.env.REACT_APP_BASE_URL}${product.item_image}`} // Update to match backend data format
                  alt={product.product_name} // Update to match backend data format
                  className="product-image"
                />
                <h3 className="product-name">{product.product_name}</h3>
                <p className="product-description">{product.description}</p>
                <p className="product-price">Price: ${product.price}</p>
               <Link to={'/ShowProduct'}><button className="btn btn-primary mt-2">ShowProduct</button></Link> 
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default SubcategoryProducts;
