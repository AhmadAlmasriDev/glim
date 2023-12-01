import React from "react"
import logo from "../assets/logo.svg"
import styles from  "./NavBar.module.css"


const NavBar = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <a aria-label="bar menu button"><i className="fa-solid fa-bars"></i></a>
                    </li>
                </ul>
                <ul className= {`${styles.test} test`}>
                    <li>
                        <a href="#">Home</a>
                    </li>
                    <li>
                        <a href="#">Movies</a>
                    </li>
                    <li>
                        <a href="#">About</a>
                    </li>
                    <li>
                        <a href="#">Contact us</a>
                    </li>
                </ul>
                <div>
                    <a aria-label="Sign in buttom"><i className="fa-regular fa-user"></i>Sign in</a>
                </div>
                <ul>
                    <li>
                        <a  aria-label="Facebook link"><i className="fa-brands fa-facebook "></i></a>
                    </li>
                    <li>
                        <a  aria-label="Twitter link"><i className="fa-brands fa-twitter"></i></a>
                    </li>
                    <li>
                        <a  aria-label="Instagram link"><i className="fa-brands fa-instagram"></i></a>
                    </li>
                    <li>
                        <a  aria-label="Youtube link"><i className="fa-brands fa-youtube"></i></a>
                    </li>   
                </ul>
            </nav>

            <div>
                <a>
                    <img src= {logo} alt="logo" height="45"/>
                </a>
            </div> 
            <div>
                <a aria-label="Sign in buttom"><i className="fa-regular fa-user"></i>Sign in</a>
            </div>





        </header>
    )
}

export default NavBar