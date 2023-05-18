import React, { useContext } from 'react';
import { useNavigate, NavLink } from "react-router-dom";
import '../../styles/navbar.css';
import '../../styles/styles.css';
import { SearchContext } from '../contexts/GlobalContexts';

export default function NavBar()
{
    const navigate = useNavigate();
    const { searchQuery, handleSearchQueryUpdate } = useContext(SearchContext);
    const handleSearchInputChange = (event) =>
    {
        handleSearchQueryUpdate(event.target.value);
    };

    const handleSearchKeyDown = (event) =>
    {
        if (event.key === 'Enter')
        {
            navigate('/store');
        }
    };

    return (
        <div className="navbar-container">
            <div className="navbar">
                <div className="navbar-chunk">
                    <NavLink className="navbar-item" to="/"><button className="navbar-title">Nimbus</button></NavLink>
                    <input className="navbar-item" type="text" placeholder="Search for products" onKeyDown={handleSearchKeyDown} onChange={handleSearchInputChange} value={searchQuery} />
                    <NavLink className="navbar-item" to="/store"><button>Search</button></NavLink>
                </div>
                <div className="navbar-chunk">
                    <NavLink className="navbar-item" to="/wishlist"><button>Wishlist</button></NavLink>
                    <NavLink className="navbar-item" to="/cart"><button>Cart</button></NavLink>
                    <NavLink className="navbar-item" to="/login"><button>Login</button></NavLink>
                    <NavLink className="navbar-item" to="/store"><button>Explore</button></NavLink>
                </div>
            </div>
        </div>
    );
}