import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JavaScript
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons
import Logo from '../assets/images/Logo/logo.png'
export default function Nav() {
  const [isExtraVisible, setIsExtraVisible] = useState(false);

  const toggleExtraVisibility = () => {
    setIsExtraVisible(!isExtraVisible);
  };

  useEffect(() => {
    const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));

    if (window.bootstrap) {
      tooltipTriggerList.forEach((tooltipTriggerEl) => new window.bootstrap.Tooltip(tooltipTriggerEl));
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-body sticky-top">
      <div className="container">
        {/* Brand Logo */}
        <Link className="navbar-brand" to="/">
          <img
            src={Logo}// Use any image URL or import an image
            alt="Website Logo"
            width="40"
            height="40"
            className="d-inline-block align-text-top me-2"
            style={{ borderRadius: '10px' }}
          />
        </Link>

        {/* Toggle button for smaller screens */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links and Search Bar */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/Home">
                <i className="bi bi-house-door-fill me-2"></i> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/About">
                <i className="bi bi-info-circle-fill me-2"></i> About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Services">
                <i className="bi bi-briefcase-fill me-2"></i> Services
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Contact">
                <i className="bi bi-telephone-fill me-2"></i> Contact Us
              </Link>
            </li>
          </ul>

          {/* Search Bar */}
          <form action='' style={{marginRight:"170px"}}>
           <input
            className="btn btn-outline-light "
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
            <button className="btn btn-outline-light ms-2" type="submit">
              <i className="bi bi-search "></i>
            </button>
            </form>

          {/* Cart Icon */}
          <Link
            to="/cart"
            className="btn btn-outline-light ms-2"
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="Cart"
          >
            <i className="bi bi-cart"></i>
          </Link>

          {/* Toggle Button for Login/Profile Links */}
          <div className="d-flex">
            <button
              className="btn btn-outline-light ms-2"
              onClick={toggleExtraVisibility}
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              title="USERS"
            >
              <i className={`bi ${isExtraVisible ? 'bi-x-lg' : 'bi-person-circle'}`}></i>
            </button>
          </div>

          {/* Conditional Rendering for Login and Profile Sections */}
          {isExtraVisible && (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  <i className="bi bi-box-arrow-right me-2"></i> Log Out
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Profile">
                  <i className="bi bi-person-fill me-2"></i> Profile
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
