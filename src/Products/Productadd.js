import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './productadd.css';

export default function AddProductForm() {
  const [product, setProduct] = useState({
    product_name: '',
    description: '',
    price: '',
    discount: '',
    item_category: '',
    subcategory_id: '',
    item_image: null,
    brand: '',
    quantity: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    // Fetch categories
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8090/getcategory');
        setCategories(response.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = async (e) => {
    const categoryName = e.target.value;
    setProduct((prevProduct) => ({ ...prevProduct, item_category: categoryName }));
    
    try {
      const response = await axios.get(`http://localhost:8090/${categoryName}/subcategories`);
      setSubcategories(response.data);
    } catch (err) {
      console.error('Error fetching subcategories:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleFileChange = (e) => {
    setProduct((prevProduct) => ({ ...prevProduct, item_image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!product.item_image) {
      setError('Please upload an image.');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('product_name', product.product_name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('discount', product.discount);
    formData.append('item_category', product.item_category);
    formData.append('subcategory_id', product.subcategory_id);
    formData.append('item_image', product.item_image);
    formData.append('brand', product.brand);
    formData.append('quantity', product.quantity);

    try {
      const response = await axios.post(process.env.REACT_APP_PRODUCT_ADD, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setSuccess('Product added successfully!');
      setProduct({
        product_name: '',
        description: '',
        price: '',
        discount: '',
        item_category: '',
        subcategory_id: '',
        item_image: null,
        brand: '',
        quantity: '',
      });
    } catch (err) {
      console.error('Error adding product:', err);
      setError(err.response?.data?.message || 'Failed to add product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-form">
      <h2>Add New Product</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="product_name"
          placeholder="Product Name"
          value={product.product_name}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="discount"
          placeholder="Discount"
          value={product.discount}
          onChange={handleChange}
        />
        <select
          name="item_category"
          value={product.item_category}
          onChange={handleCategoryChange}
          required
        >
          <option value="">Select Category</option>
          {categories.map(category => (
            <option key={category.id} value={category.name}>{category.name}</option>
          ))}
        </select>
        <select
          name="subcategory_id"
          value={product.subcategory_id}
          onChange={handleChange}
          required
        >
          <option value="">Select Subcategory</option>
          {subcategories.map(subcategory => (
            <option key={subcategory.id} value={subcategory.id}>{subcategory.name}</option>
          ))}
        </select>
        <input
          type="file"
          name="item_image"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={product.brand}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={product.quantity}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Adding Product...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
}
