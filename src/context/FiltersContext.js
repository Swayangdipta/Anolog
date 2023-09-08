import {createContext, useState} from "react";

export const FiltersContext = createContext()

export const FiltersProvider = (props) => {
    const [filters,setFilters] = useState({
        theme: 'dark',
        sort: 'new',
        category: 'all',
        view: 'normal'
    })

    return(
        <FiltersContext.Provider value={[filters,setFilters]} >
            {props.children}
        </FiltersContext.Provider>
    )
}