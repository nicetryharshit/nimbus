import React, { useContext } from 'react';
import { NavLink } from "react-router-dom";
import '../../styles/navbar.css';
import '../../styles/styles.css';
import { SearchContext } from '../contexts/SearchContext';

export default function NavBar()
{
    const { searchQuery, handleSearchQueryUpdate } = useContext(SearchContext);
    const handleSearchInputChange = (event) =>
    {
        handleSearchQueryUpdate(event.target.value);
    };

    return (
        <div className="navbar-container">
            <div className="navbar">
                <div className="navbar-chunk">
                    <NavLink className="navbar-item" to="/"><button className="navbar-title">Nimbus</button></NavLink>
                    <input className="navbar-item" type="text" placeholder="Search for products" onChange={handleSearchInputChange} value={searchQuery} />
                    <NavLink className="navbar-item" to="/products"><button>Search</button></NavLink>
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