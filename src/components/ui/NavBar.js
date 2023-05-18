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
                    <NavLink className="navbar-item" to="/"><button className="navbar-title">Nimbus</button></NavLink>
                    <input className="navbar-item" type="text" placeholder="Search for products" />
                </div>
                <div className="navbar-chunk">
                    <NavLink className="navbar-item" to="/wishlist"><button>Wishlist</button></NavLink>
                    <NavLink className="navbar-item" to="/cart"><button>Cart</button></NavLink>
                    <NavLink className="navbar-item" to="/login"><button>Login</button></NavLink>
                    <NavLink className="navbar-item" to="/products"><button>Explore</button></NavLink>
                </div>
            </div>
        </div>
    );
}