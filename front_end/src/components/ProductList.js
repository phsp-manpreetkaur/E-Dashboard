import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:5000/products", {
      headers: {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
      }
    });

    result = await result.json();
    setProducts(result);
  };

  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:5000/products/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
      }
    });

    result = await result.json();
    if (result) {
      alert("Product deleted successfully");
      getProducts();
    }
  };

  const searchHandle = async (event) => {
    const key = event.target.value;

    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`, {
        headers: {
          "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
        }
      });

      result = await result.json();
      setProducts(result);
    } else {
      getProducts();
    }
  };

  return (
    <div className="product-list">
      <h3>Product List</h3>

      <input
        type="text"
        placeholder="Search Product"
        className="search-product"
        onChange={searchHandle}
      />

      <ul>
        <li className="header">Sr No.</li>
        <li className="header">Name</li>
        <li className="header">Price</li>
        <li className="header">Category</li>
        <li className="header">Company</li>
        <li className="header">Operation</li>
      </ul>

      {products.length > 0 ? (
        products.map((item, index) => (
          <ul key={item._id}>
            <li>{index + 1}</li>
            <li>{item.name}</li>
            <li>₹ {item.price}</li>
            <li>{item.category}</li>
            <li>{item.company}</li>
            <li>
              <button
                className="delete-btn"
                onClick={() => deleteProduct(item._id)}
              >
                Delete
              </button>
              <Link to={`/update/${item._id}`} className="update-btn">
                Update
              </Link>
            </li>
          </ul>
        ))
      ) : (
        <h1>No Products Found</h1>
      )}
    </div>
  );
};

export default ProductList;
