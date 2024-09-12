import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import './catagories.css'; // Custom CSS file for styling
import axios from 'axios';

export default function Catagories() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState({}); // Object to store subcategories for each category

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8090/getcategory');
        setCategories(response.data);
      } catch (err) {
        console.error('Error fetching categories ', err);
      }
    };
    fetchCategories();
  }, []);

  const fetchSubcategories = async (categoryName) => {
    try {
      const response = await axios.get(`http://localhost:8090/${categoryName}/subcategories`);
      setSubcategories((prev) => ({
        ...prev,
        [categoryName]: response.data,
      }));
    } catch (err) {
      console.error('Error fetching subcategories:', err);
    }
  };

  const toggleDropdown = (categoryName) => {
    setActiveDropdown(categoryName);
    if (!subcategories[categoryName]) {
      fetchSubcategories(categoryName); // Fetch subcategories if not already fetched
    }
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  return (
    <nav className="container-nav">
      <div className="navbar-container">
        {/* Main categories with toggles */}
        <div className="navbar-links">
          {categories.map((category) => (
            <div
              key={category.id}
              className="navbar-link"
              onMouseOver={() => toggleDropdown(category.name)}
              onMouseLeave={closeDropdown}
            >
              {category.name}
              <FontAwesomeIcon
                icon={activeDropdown === category.name ? faChevronDown : faChevronUp}
                className="dropdown-toggle"
              />
              <div className={`dropdown ${activeDropdown === category.name ? 'open' : ''}`}>
                {subcategories[category.name] ? (
                  subcategories[category.name].map((subcategory) => (
                    <NavLink
                    key={subcategory.id}
                    to={`/subcategory/${subcategory.name.toLowerCase()}`} // Updated to match route
                    state={{ subcategory: subcategory.name.toLowerCase() }} // Pass state with subcategory name
                    className="dropdown-link"
                  >
                    {subcategory.name}
                  </NavLink>
                  
                  ))
                ) : (
                  <p>Loading...</p> // Loading indicator while fetching subcategories
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
