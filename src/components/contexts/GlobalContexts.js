import { createContext, useState } from "react";
import { useSearchParams } from "react-router-dom";

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
    const [userData, setUserData] = useState();


    const handleLoginUpdate = (state, data) =>
    {
        setIsLoggedIn(state);

        //if logged in set token too; else remove
        if (state === true)
        {
            setUserData(data);
        }
        else
        {
            setUserData({});
        }
        console.log("Is logged in: " + isLoggedIn);
        console.log("DATA: " + userData);
    };

    return (<AuthContext.Provider value={{ isLoggedIn, handleLoginUpdate }}>
        {children}
    </AuthContext.Provider>)
}