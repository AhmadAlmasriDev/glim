import React from "react"
import Logo from "./Logo"
import styles from  "../styles/NavBar.module.css"
import {NavLink} from 'react-router-dom'
import { useContext } from "react"
import DataContext from "../context/DataContext"



const NavBar = () => {
    const {handleToggleSideBar} = useContext(DataContext)
    

    return (
        <header className={`main-container flex-container ${styles.header}`}>
            <nav>
                <ul>
                    <li className={`${styles.bar_menu}`}>
                        <a 
                            aria-label="bar menu button"
                            onClick ={handleToggleSideBar}
                        ><i className={`fa-solid fa-bars`}></i></a>
                    </li>
                </ul>
                
            </nav>
            <NavLink to='/'>
                <Logo height = {45}/>
            </NavLink>
            
            <NavLink to ='/signin' className= {`${styles.sign_in} `}>
                <a aria-label="Sign in buttom"><i className={`${styles.sign_in_icon} fa-regular fa-user`}></i>Sign in</a>
            </NavLink>

        </header>
    )
}

export default NavBar