import { createContext, useState } from "react";

export const SearchContext = createContext();
export const AuthContext = createContext();

export function SearchProvider({ children })
{
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchQueryUpdate = (searchQueryString) =>
    {
        setSearchQuery(searchQueryString);
    };

    return (<SearchContext.Provider value={{ searchQuery, handleSearchQueryUpdate }}>
        {children}
    </SearchContext.Provider>)
};


export function AuthProvider({ children })
{
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLoginUpdate = (state) =>
    {
        setIsLoggedIn(state);
        console.log("Is logged in: " + isLoggedIn);
    };

    return (<AuthContext.Provider value={{ isLoggedIn, handleLoginUpdate }}>
        {children}
    </AuthContext.Provider>)
}