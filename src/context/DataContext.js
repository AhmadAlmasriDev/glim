import {createContext, useState, useEffect} from 'react';



import { useHistory } from 'react-router-dom';
import '../api/axiosDefaults'



const DataContext = createContext({});

export const DataProvider =({children}) =>{
    const [viewSideNav, setViewSideNav] = useState(false)
    const [currentUser,setCurrentUser] = useState()

    const handleToggleSideBar = ()=> setViewSideNav(!viewSideNav)

    

    return(
        <DataContext.Provider value ={{
            viewSideNav, 
            setViewSideNav,
            handleToggleSideBar,
            currentUser,
            setCurrentUser,
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext