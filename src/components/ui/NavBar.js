import React, { useContext } from 'react';
import { useNavigate, NavLink } from "react-router-dom";
import '../../styles/navbar.css';
import '../../styles/styles.css';
import { AuthContext, SearchContext, UserContext } from '../contexts/GlobalContexts';
// import { ToastContext } from '../contexts/GlobalContexts';

export default function NavBar()
{
    // const { showToast } = useContext(ToastContext);
    const navigate = useNavigate();
    const { searchQuery, updateSearchQuery } = useContext(SearchContext);
    const { isLoggedIn, updateLoginState } = useContext(AuthContext);
    const { cartData, wishlistData } = useContext(UserContext);
    const handleSearchInputChange = (event) =>
    {
        updateSearchQuery(event.target.value);
    };

    const handleSearchKeyDown = (event) =>
    {
        if (event.key === 'Enter')
        {
            navigate('/store');
        }
    };

    // const handleTest = () =>
    // {
    //     console.log("TOAST");
    //     showToast('This is a toast message!');
    // };

    return (
        <div className="navbar-container">
            <div className="navbar">
                <div className="navbar-chunk">
                    <NavLink className="navbar-item" to="/"><button id="navbar-title">Nimbus</button></NavLink>
                    <input id="search-bar" className="navbar-item" type="text" placeholder="Search for products" onKeyDown={handleSearchKeyDown} onChange={handleSearchInputChange} value={searchQuery} />
                    <NavLink className="navbar-item" to="/store"><button>Search</button></NavLink>
                    {/* <button onClick={handleTest}>test</button> */}
                </div>
                <div id="navbar-rhs" className="navbar-chunk">
                    <NavLink className="navbar-item" to="/wishlist"><button>Wishlist {isLoggedIn && `(${wishlistData.length})`}</button></NavLink>
                    <NavLink className="navbar-item" to="/cart"><button>Cart {isLoggedIn && `(${cartData.length})`}</button></NavLink>
                    {!isLoggedIn
                        ? <NavLink className="navbar-item" to="/login"><button>Login</button></NavLink>
                        : (<button onClick={() => updateLoginState(false, null)} >Logout</button>)}
                    <NavLink className="navbar-item" to="/store"><button>Explore</button></NavLink>
                </div>
            </div >
        </div >
    );
}