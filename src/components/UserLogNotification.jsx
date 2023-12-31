import React from 'react'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'
import styles from '../styles/NavBar.module.css'
import { useContext } from 'react';
import DataContext from '../context/DataContext';

const UserLogNotification = () => {
    const {currentUser} = useContext(DataContext)

    const loggedIn = (
        
            <NavLink to ='/signin' className= {`${styles.sign_in} `}>
                Hello, {currentUser?.username}
            </NavLink>  
        
    )

    const loggedOut = ( 
        
            <NavLink to ='/signin' className= {`${styles.sign_in} `}>
                <i className={`${styles.sign_in_icon} fa-regular fa-user`}></i>Sign in
            </NavLink>   
          
    )
    
    
    return (
        <>
            {currentUser ? loggedIn : loggedOut}
        </>
            
        
       
        
    )
}

export default UserLogNotification