import React from 'react';
import { useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import '../styles/navbar.css';

// COMPONENT(S)
import NavSearch from './NavSearch';
import NavSearchMobile from './NavSearchMobile';

const Navbar = ({ marginBottom }) => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  useEffect(() => {
    // CUSTOM SCRIPT
    // DESKTOP CONFIG
    const searchbar = document.querySelector(".search");
    const openSearchIcon = document.querySelector(".search-icon-image");
    const closeSearchIcon = document.querySelector("img.search-cancel");
    // const navLink = document.querySelector("a.desktop-nav-list-link");
    // const contextMenu = document.querySelector(".context-menu");

    // Open Search Menu
    openSearchIcon.addEventListener("click", () => {
      searchbar.classList.add("active");
    });
    // Close Search Menu
    closeSearchIcon.addEventListener("click", () => {
      searchbar.classList.remove("active");
    });
    // Open Navbar Context Menu
    // navLink.addEventListener("click", (e) => {
    //   e.preventDefault();
    //   contextMenu.classList.toggle("active");
    // });

    // MOBILE NAVBAR CONFIG
    const hamburgerIcon = document.querySelector(
      ".navbar-hamburger-icon img"
    );
    const mobileNavPopup = document.querySelector(".nav-menu");
    const mobileNavCancelIcon = document.querySelector(
      ".nav-menu-cancel-icon"
    );

    hamburgerIcon.addEventListener("click", () => {
      mobileNavPopup.style.display = "block";
    });

    mobileNavCancelIcon.addEventListener("click", () => {
      mobileNavPopup.style.display = "none";
    });

    // MOBILE SEARCH CONFIG
    const navSearchIcon = document.querySelector(".nav-search-icon");
    const searchDivMobile = document.querySelector(".search-mobile");
    const searchCloseIcon = document.querySelector(".search-cancel-mobile");
    navSearchIcon.addEventListener("click", () => {
      searchDivMobile.classList.toggle("active");
    });
    searchCloseIcon.addEventListener("click", () => {
      searchDivMobile.classList.toggle("active");
    });
  }, []);

  return (
    <div style={{ marginBottom }}>
      {/* DESKTOP NAVBAR */}
      <div id="nav-container">

        {/* SEARCH OVERLAY */}
        <NavSearch />

        <div className="nav-logo-container">
          <a className="nav-logo-link" href="/">
            <img
              className="nav-logo"
              src="/images/homepage/aurora-logo-white.png"
              alt="Aurora logo"
            />
          </a>
        </div>

        <nav id="main-desktop">
          <div className="links-container">
            {/* <ul className="desktop-nav-links-empty"></ul> */}
            <ul className="desktop-nav-links">
              <li className="desktop-nav-link-list">
                <a href="/collections/main/fine-jewelry" className="desktop-nav-list-link">Fine Jewelry</a>
              </li>
              {/* <li className="desktop-nav-link-list">
                <a className="desktop-nav-list-link" href="/collections/main/demi-fine-jewelry">Demi Fine Jewelry</a>
              </li> */}
              {/* <li className="desktop-nav-link-list">
                <a className="desktop-nav-list-link" href="#">baby jewelry</a>
              </li> */}
              {!isAuthenticated ? (
                <li className="desktop-nav-link-list">
                  <button className="desktop-nav-list-link" onClick={() => loginWithRedirect()} style={{ padding: 0 }}>Account</button>
                </li>
              ) :
                <li className="desktop-nav-link-list">
                  <a href='/account/dashboard' className="desktop-nav-list-link" style={{ padding: 0 }}>Dashboard</a>
                </li>
              }
              <li className="desktop-nav-link-list">
                <a className="desktop-nav-list-link" href="/contact">contact</a>
              </li>
            </ul>
            <ul className="desktop-nav-cart-container">
              <li>
                <img
                  className="search-icon-image"
                  src="/images/homepage/icons/search-icon-white.svg"
                  alt="search icon"
                />
              </li>
              <li>
                <a href="/checkout/cart">
                  <img
                    src="/images/homepage/icons/bag-icon-white.svg"
                    alt="cart icon"
                  />
                </a>
              </li>
            </ul>
          </div>
        </nav>

        {/* CONTEXT MENU parent */}
        <div className="context-container">
          <div className="context-menu">
            <div className="context-content">
              <div className="context-collection">
                <h4>Shop by collection</h4>
                <a href="/collections/aurora" className="context-collection-link">Aurora</a>
                <a href="/collections/daria" className="context-collection-link">Daria</a>
                <a href="/collections/nova" className="context-collection-link">Nova</a>
                <a href="/collections/sevilla" className="context-collection-link">Sevilla</a>
                {/* <a href="/collections/" className="context-collection-link">View All</a> */}
              </div>
              <div className="context-category">
                <h4>Shop by category</h4>
                <a href="/products/category/bangles" className="context-category-link">Bangles</a>
                <a href="/products/category/earrings" className="context-category-link">Earrings</a>
                <a href="/products/category/necklaces" className="context-category-link">Necklaces</a>
                <a href="/products/category/rings" className="context-category-link">Rings</a>
              </div>
            </div>
            <div className="context-image">
              <img src="/images/homepage/collections/daria.webp" alt="random product" />
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE NAVBAR */}
      <nav id="mobile-navbar">
        <div className="navbar-hamburger-icon">
          <img src="/images/homepage/icons/menu-icon-white.svg" alt="Menu icon" />
        </div>
        <div className="navbar-logo">
          <a href="/">
            <img
              src="/images/homepage/aurora-logo-white.png"
              alt="Aurora Jewelry Logo"
            />
          </a>
        </div>
        <div className="navbar-utility-icons">
          <div className="nav-search-icon">
            <img
              src="/images/homepage/icons/search-icon-white.svg"
              alt="Search Icon"
            />
          </div>
          <a href='/checkout/cart' className="nav-cart-icon">
            <img
              src="/images/homepage/icons/bag-icon-white.svg"
              alt="Shopping Bag Icon"
            />
          </a>
        </div>

        {/* MOBILE NAVBAR OVERLAY */}
        <div className="nav-menu">
          <div className="nav-menu-cancel-icon">
            <img src="/images/homepage/icons/close-icon.svg" alt="Close Icon" />
          </div>
          <ul>
            <li><a href="/collections/main/fine-jewelry">FINE JEWELRY</a></li>
            <li>
              <button className="desktop-nav-list-link" onClick={() => loginWithRedirect()} style={{ padding: 0, display: "inline-block", width: "min-content" }}>Account</button>
            </li>
            <li><a href="/contact">CONTACT</a></li>
          </ul>
        </div>

        {/* SEARCH OVERLAY - MOBILE */}
        <NavSearchMobile />
      </nav>
    </div>
  );
};

export default Navbar;