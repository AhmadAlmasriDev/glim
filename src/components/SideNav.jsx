import React from 'react'
import {NavLink} from 'react-router-dom'

import SideNavMediaLink from './SideNavMediaLink'
import Logo from './Logo'
import styles from "../styles/SideNav.module.css"

import { useContext } from "react"
import DataContext from "../context/DataContext"

const SideNav = () => {
    const {viewSideNav, handleToggleSideBar} =useContext(DataContext)
    return (
        <aside className= {`main-container`}>
            <div onClick={handleToggleSideBar} className= {`${styles.blur} ${viewSideNav ? "" : "display-non"}`}>
            </div>   
        
            <div className= {`${styles.background}  v-flex-container ${viewSideNav ? styles.background_view : styles.background_hide}`}>
                
                <div className= {`flex-container ${styles.close_button_container}`}>
                    <button className= {`${styles.close_button}`} onClick={handleToggleSideBar}> 
                        <a>
                            <i className="fa-solid fa-xmark"></i>
                        </a>

                    </button>
                </div> 
                <div className= {`${styles.side_menu} v-flex-container`}>
                    <NavLink to = '/'>
                        <Logo className= {`${styles.side_menu_logo}`} height = {90}/>
                    </NavLink>
                    <div className= {`button ${styles.side_signin_button}`}>
                        <NavLink to ='/signin' aria-label="Sign in buttom"><i className={`${styles.signin_icon} fa-regular fa-user`}></i>Sign in</NavLink>
                    </div>
                    <nav className= {`${styles.side_nav_container}`}>
                        <ul>
                            <li>
                                <NavLink to ='/'>Home</NavLink>
                            </li>
                            <li>
                                <NavLink to ='/movies'>Movies</NavLink>
                            </li>
                            <li>
                                <NavLink to ='/about'>About</NavLink>
                            </li>
                            <li>
                                <NavLink to ='/contact'>Contact us</NavLink>
                            </li>
                        </ul>
                        
                        <ul className= {`${styles.media_links_container}`}>
                            <SideNavMediaLink brand = {'facebook'}/>
                            <SideNavMediaLink brand = {'twitter'}/>
                            <SideNavMediaLink brand = {'instagram'}/>
                            <SideNavMediaLink brand = {'youtube'}/>
                        </ul>
                    </nav>
                </div>
            </div>

            
        </aside>
    )
}

export default SideNav