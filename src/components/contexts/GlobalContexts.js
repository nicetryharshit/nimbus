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

    return (<SearchContext.Provider value={{ searchQuery, updateSearchQuery }}>
        {children}
    </SearchContext.Provider>)
};


export function AuthProvider({ children })
{
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const updateLoginState = (state) =>
    {
        console.log("Is logged in: " + state);
        setIsLoggedIn(state);
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
        email: ''
    });

    const [wishlistData, setWishlistData] = useState([]);
    const [cartData, setCartData] = useState([]);

    const updateUserProfile = ({ firstName, lastName, email }) =>
    {
        // const  = foundUser;
        console.log(`user updated ${firstName} ${lastName} ${email}`);
        setUserProfile({
            firstName: firstName,
            lastName: lastName,
            email: email,
            addresses: []
        });
    };
    const updateWishlistData = (wishlist) =>
    {
        console.log("wishlist update" + JSON.stringify(wishlist));
        setWishlistData(wishlist);
    };
    const updateCartData = (cart) =>
    {
        console.log("cart update" + JSON.stringify(cart));
        setCartData(cart);
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