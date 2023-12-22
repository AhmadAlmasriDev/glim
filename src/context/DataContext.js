import {createContext, useState, useEffect} from 'react';



import { useHistory } from 'react-router-dom';
import '../api/axiosDefaults'



const DataContext = createContext({});

export const DataProvider =({children}) =>{
    const [viewSideNav, setViewSideNav] = useState(false)

    const handleToggleSideBar = ()=> setViewSideNav(!viewSideNav)

    return(
        <DataContext.Provider value ={{
            viewSideNav, 
            setViewSideNav,
            handleToggleSideBar
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext