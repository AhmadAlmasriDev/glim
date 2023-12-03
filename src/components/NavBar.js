import React from "react"
import logo from "../assets/logo.svg"
import styles from  "../styles/NavBar.module.css"



const NavBar = () => {
    return (
        <header className={`main-container flex-container ${styles.header}`}>
            <nav>
                <ul>
                    <li className={`${styles.bar_menu}`}>
                        <a aria-label="bar menu button"><i className={`fa-solid fa-bars`}></i></a>
                    </li>
                </ul>
                
            </nav>

            <div className= {``}>
                <a>
                    <img src= {logo} alt="logo" height="45"/>
                </a>
            </div> 
            <div className= {`${styles.sign_in} `}>
                <a aria-label="Sign in buttom"><i className={`fa-regular fa-user`}></i>Sign in</a>
            </div>

        </header>
    )
}

export default NavBar