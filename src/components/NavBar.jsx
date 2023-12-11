import React from "react"
import logo from "../assets/logo.svg"
import Logo from "./Logo"
import styles from  "../styles/NavBar.module.css"



const NavBar = ({viewSideNav, setViewSideNav}) => {

    const handleToggleSideBar = ()=> setViewSideNav(!viewSideNav)
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
            <Logo height = {45}/>
            
            <div className= {`${styles.sign_in} `}>
                <a aria-label="Sign in buttom"><i className={`fa-regular fa-user`}></i>Sign in</a>
            </div>

        </header>
    )
}

export default NavBar