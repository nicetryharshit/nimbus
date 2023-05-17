import "./App.css";
import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Products from "./components/pages/Products";
import Product from "./components/pages/Product";
import Wishlist from "./components/pages/Wishlist";
import Cart from "./components/pages/Cart";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";

function App()
{
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route exact path="/product" element={<Product />} />
				<Route path="/products:id" element={<Products />} />
				<Route exact path="/wishlist" element={<Wishlist />} />
				<Route exact path="/cart" element={<Cart />} />
				<Route exact path="/login" element={<Login />} />
				<Route exact path="/signup" element={<Signup />} />
			</Routes>
		</div >
	);
}

export default App;
