import React, { createContext, useState } from "react";

export const SearchContext = createContext();
export const AuthContext = createContext();
export const UserContext = React.createContext();
export const ToastContext = createContext();

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

export function ToastProvider({ children })
{
    const [toastMessage, setToastMessage] = useState('');
    const [isToastVisible, setToastVisible] = useState(false);

    const showToast = (message) =>
    {
        setToastMessage(message);
        setToastVisible(true);
        setTimeout(() =>
        {
            setToastVisible(false);
        }, 2000); // Hide the toast after 2 seconds
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {isToastVisible && (
                <div
                    style={{
                        position: 'fixed',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        bottom: '16px',
                        zIndex: '9999',
                    }}
                >
                    <div
                        style={{
                            backgroundColor: '#111',
                            color: '#fff',
                            padding: '8px',
                            borderRadius: '4px',
                        }}
                    >
                        {toastMessage}
                    </div>
                </div>
            )}
        </ToastContext.Provider>
    );
};