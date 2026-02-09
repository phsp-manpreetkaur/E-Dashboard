import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch('http://localhost:5000/products')
    result = await result.json();
    setProducts(result);
  };

 
  const deleteProduct = async (id) => {
  let result = await fetch(`http://localhost:5000/products/${id}`, {
    method: 'DELETE'
  });
  result = await result.json()
  if(result){ 
    alert("Product deleted successfully");
  }
  getProducts();
  }

  return (
    <div className="product-list">
      <h3>Product List</h3>
      <ul>  
        <li className="header">Sr No.</li>
        <li className="header">Name</li>
        <li className="header">Price</li>
        <li className="header">Category</li>
        <li className="header">Company</li>
        <li>Operation</li>
      </ul>
      {
        products.map((item, index) => 
           <ul>  
        <li >{index+1}</li>
        <li>{item.name}</li>
        <li>₹ {item.price}</li>
        <li>{item.category}</li>
        <li>{item.company}</li>
        <li><button className="delete-btn" onClick={() => deleteProduct(item._id)}>Delete</button></li>
        <Link to ={`/update/${item._id}`}>Update</Link>
       
      </ul>
)
      }
      
    </div>
  );
};
export default ProductList;
