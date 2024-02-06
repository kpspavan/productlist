// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./component/Productlist/Createcontext/Shoppingcart";
import ProductList from "./component/Productlist/ProductList/Productlist";
import Cart from "./component/Productlist/ShoopingCart/Shoopingcart";
import Navbar from "./component/Productlist/Navbar/Navbar";

function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
