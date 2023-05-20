import React, { createContext, useState } from "react";

export const SearchContext = createContext();
export const AuthContext = createContext();

export function SearchProvider({ children })
{
    const [searchQuery, setSearchQuery] = useState("");

    const updateSearchQuery = (searchQueryString) =>
    {
        setSearchQuery(searchQueryString);
    };

    return (<SearchContext.Provider value={{ searchQuery, handleSearchQueryUpdate: updateSearchQuery }}>
        {children}
    </SearchContext.Provider>)
};


export function AuthProvider({ children })
{
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const updateLoginState = (state) =>
    {
        setIsLoggedIn(state);
        console.log("Is logged in: " + isLoggedIn);
    };

    return (<AuthContext.Provider value={{ isLoggedIn, updateLoginState }}>
        {children}
    </AuthContext.Provider>)
}

export const UserContext = React.createContext();

export function UserProvider({ children })
{
    const [userProfile, setUserProfile] = useState({
        firstName: '',
        lastName: '',
        email: '',
        addresses: []
    });

    const [wishlistData, setWishlistData] = useState([]);
    const [cartData, setCartData] = useState([]);

    const updateUserProfile = (user) =>
    {
        setUserProfile({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            addresses: []
        });
    };
    const updateWishlistData = (user) =>
    {
        setWishlistData(user.wishlist);
    };
    const updateCartData = (user) =>
    {
        setCartData(user.cart);
    };
    return (
        <UserContext.Provider
            value={{
                userProfile,
                wishlistData,
                cartData,
                updateUserProfile,
                updateWishlistData,
                updateCartData,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}