import React from 'react';
import { NavLink } from "react-router-dom";
import '../../styles/navbar.css';
import '../../styles/styles.css';

export default function NavBar()
{
    return (
        <div className="navbar-container">
            <div className="navbar">
                <div className="navbar-chunk">
                    <NavLink to="/"><button className="navbar-title">Nimbus</button></NavLink>
                </div>
                <div className="navbar-chunk">
                    <input type="text" placeholder="Search for products" />
                </div>
                <div className="navbar-chunk">
                    <NavLink to="/wishlist"><button>Wishlist</button></NavLink>
                    <NavLink to="/cart"><button>Cart</button></NavLink>
                    <NavLink to="/login"><button>Login</button></NavLink>
                </div>
            </div>
        </div>
    );
}