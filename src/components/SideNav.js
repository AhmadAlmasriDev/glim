import React from 'react'
import logo from "../assets/logo.svg"
import styles from "../styles/SideNav.module.css"
const SideNav = () => {
  return (
    <div className= {`main-container`}>
        <div className= {`${styles.blur}`}>
            <div className= {`${styles.background}`}>
                
                <div className= {`flex-container`}>
                    <div className= {`${styles.close_button}`}>
                        <a>
                            <i class="fa-solid fa-xmark"></i>
                        </a>

                    </div>
                </div> 
                <div className= {``}>
                    <a>
                        <img src= {logo} alt="logo" height="45"/>
                    </a>
                </div> 
                <ul>
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
                <div className= {``}>
                    <a aria-label="Sign in buttom"><i className="fa-regular fa-user"></i>Sign in</a>
                </div>
                <ul className= {``}>
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
        </div>

        </div>
    </div>
  )
}

export default SideNav