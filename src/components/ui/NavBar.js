import React from 'react';
import { NavLink } from "react-router-dom";
import '../../styles/navbar.css';

export default function NavBar()
{
    return (
        <div className="navbar">
            <h1>Nimbus</h1>
            <input type="text" placeholder="Search for products" />
            <NavLink to="/wishlist">Wishlist</NavLink>
            <NavLink to="/card">Cart</NavLink>
            <NavLink to="/login">Login</NavLink>
        </div>
    );
}