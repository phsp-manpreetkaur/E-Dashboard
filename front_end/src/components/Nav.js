import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
  const auth = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate('/signup');
  };

  return (
    <div className="nav-bar">
    <img
      alt="Logo"
      className="logo"
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA_PFMIWuIauPEhoMr2cFiYMRATZULlMN3ig&s=https://img.pikbest.com/png-images/20241023/vibrant-e-commerce-logo-with-shopping-bag-and-play-icon_10994976.png!sw800"
    />

      {auth ? (
        <ul className="nav-ul">
          <li><Link to="/">Products</Link></li>
          <li><Link to="/add">Add Product</Link></li>
          <li><Link to="/update">Update Product</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li>
            <Link to="#" onClick={logout}>
              Logout ({auth.name})
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-ul nav-right">
          <li><Link to="/signup">Sign Up</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      )}
    </div>
  );
};

export default Nav;
