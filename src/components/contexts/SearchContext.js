import { createContext, useState } from "react";

export const SearchContext = createContext();
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