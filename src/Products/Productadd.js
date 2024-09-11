import React, { useState } from 'react';
import axios from 'axios';
import './productadd.css';

export default function AddProductForm() {
  const [product, setProduct] = useState({
    product_name: '',
    description: '',
    price: '',
    discount: '',
    item_category: '',
    item_image: null,
    brand: '',
    quantity: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

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
    formData.append('item_image', product.item_image);
    formData.append('brand', product.brand);
    formData.append('quantity', product.quantity);

    try {
      const response = await axios.post(process.env.REACT_APP_PRODUCT_ADD, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        
      });
      console.log("This is api to add product ",response);

      setSuccess('Product added successfully!');
      setProduct({
        product_name: '',
        description: '',
        price: '',
        discount: '',
        item_category: '',
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
        <input
          type="text"
          name="item_category"
          placeholder="Category"
          value={product.item_category}
          onChange={handleChange}
          required
        />
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
