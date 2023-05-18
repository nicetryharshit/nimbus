import "./App.css";
import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/HomePage";
import StorePage from "./components/pages/StorePage";
import Product from "./components/pages/ProductPage";
import Wishlist from "./components/pages/WishlistPage";
import Cart from "./components/pages/CartPage";
import Login from "./components/pages/LoginPage";
import Signup from "./components/pages/SignupPage";

import Mockman from "mockman-js";

function App()
{
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route exact path="/store" element={<StorePage />} />
				<Route path="/product/:id" element={<Product />} />
				<Route exact path="/wishlist" element={<Wishlist />} />
				<Route exact path="/cart" element={<Cart />} />
				<Route exact path="/login" element={<Login />} />
				<Route exact path="/signup" element={<Signup />} />
				<Route exact path="/mockman" element={<Mockman />} />
			</Routes>
		</div >
	);
}

export default App;
