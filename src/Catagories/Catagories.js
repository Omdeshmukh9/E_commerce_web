import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChild, faMobileAlt, faTv, faTshirt, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import './catagories.css'; // Custom CSS file for styling

export default function Catagories() {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (category) => {
    setActiveDropdown(category);
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  return (
    <nav className="container-nav">
      <div className="navbar-container">
        {/* Main categories with toggles */}
        <div className="navbar-links">
          {/* Kids Category with Dropdown */}
          <div
            className="navbar-link"
            onMouseOver={() => toggleDropdown('kids')}
            onMouseLeave={closeDropdown}
          >
            <FontAwesomeIcon icon={faChild} className="icon" /> Kids
            <FontAwesomeIcon
              icon={activeDropdown === 'kids' ? faChevronDown  : faChevronUp}
              className="dropdown-toggle"
            />
            <div className={`dropdown ${activeDropdown === 'kids' ? 'open' : ''}`}>
              <NavLink to="/kids/clothes" className="dropdown-link">Clothes</NavLink>
              <NavLink to="/kids/toys" className="dropdown-link">Toys</NavLink>
              <NavLink to="/kids/shoes" className="dropdown-link">Shoes</NavLink>
            </div>
          </div>

          {/* Mobiles Category with Dropdown */}
          <div
            className="navbar-link"
            onMouseOver={() => toggleDropdown('mobiles')}
            onMouseLeave={closeDropdown}
          >
            <FontAwesomeIcon icon={faMobileAlt} className="icon" /> Mobiles
            <FontAwesomeIcon
              icon={activeDropdown === 'mobiles' ? faChevronDown  : faChevronUp}
              className="dropdown-toggle"
            />
            
            <div className={`dropdown ${activeDropdown === 'mobiles' ? 'open' : ''}`}>
              <NavLink to="/mobiles/smartphones" className="dropdown-link">Smartphones</NavLink>
              <NavLink to="/mobiles/accessories" className="dropdown-link">Accessories</NavLink>
              <NavLink to="/mobiles/cases" className="dropdown-link">Cases</NavLink>
            </div>
          </div>

          {/* Electronics Category with Dropdown */}
          <div
            className="navbar-link"
            onMouseOver={() => toggleDropdown('electronics')}
            onMouseLeave={closeDropdown}
          >
            <FontAwesomeIcon icon={faTv} className="icon" /> Electronics
            <FontAwesomeIcon
              icon={activeDropdown === 'electronics' ? faChevronDown  : faChevronUp}
              className="dropdown-toggle"
            />
            <div className={`dropdown ${activeDropdown === 'electronics' ? 'open' : ''}`}>
              <NavLink to="/electronics/headphones" className="dropdown-link">Headphones</NavLink>
              <NavLink to="/electronics/trimmers" className="dropdown-link">Trimmers</NavLink>
              <NavLink to="/electronics/lights" className="dropdown-link">Lights</NavLink>
            </div>
          </div>

          {/* Fashion Category with Dropdown */}
          <div
            className="navbar-link"
            onMouseOver={() => toggleDropdown('fashion')}
            onMouseLeave={closeDropdown}
          >
            <FontAwesomeIcon icon={faTshirt} className="icon" /> Fashion
            <FontAwesomeIcon
              icon={activeDropdown === 'fashion' ? faChevronDown  : faChevronUp}
              className="dropdown-toggle"
            />
            <div className={`dropdown ${activeDropdown === 'fashion' ? 'open' : ''}`}>
              <NavLink to="/fashion/men" className="dropdown-link">Men</NavLink>
              <NavLink to="/fashion/women" className="dropdown-link">Women</NavLink>
              <NavLink to="/fashion/kids" className="dropdown-link">Kids</NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
