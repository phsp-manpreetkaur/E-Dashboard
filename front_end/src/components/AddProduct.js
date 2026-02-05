import React from "react";  

const AddProduct = () => {
    const [name, setName] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [company, setCompany] = React.useState("");

    const addProduct = async () => {
        console.warn(name, price, category, company);
    };

    return (
        <div className="product">
            <h1>Add Product</h1>

            <input
                className="inputBox"
                type="text"
                placeholder="Enter Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <input
                className="inputBox"
                type="text"
                placeholder="Enter Product Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />

            <input
                className="inputBox"
                type="text"
                placeholder="Enter Product Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />

            <input
                className="inputBox"
                type="text"
                placeholder="Enter Product company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
            />

            <button onClick={addProduct} className="signup-btn">
                Add Product
            </button>
        </div>
    );
};

export default AddProduct;
