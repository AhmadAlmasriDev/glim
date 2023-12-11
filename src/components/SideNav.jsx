import React from 'react'
import SideNavMediaLink from './SideNavMediaLink'
import Logo from './Logo'
import styles from "../styles/SideNav.module.css"

const SideNav = ({viewSideNav}) => {
  return (
    <div className= {`main-container`}>
        <div className= {`${styles.blur} ${viewSideNav ? "" : "display-non"}`}>
        </div>   
    
        <div className= {`${styles.background}  v-flex-container ${viewSideNav ? styles.background_view : styles.background_hide}`}>
            
            <div className= {`flex-container ${styles.close_button_container}`}>
                <button className= {`${styles.close_button}`}>
                    <a>
                        <i class="fa-solid fa-xmark"></i>
                    </a>

                </button>
            </div> 
            <div className= {`${styles.side_menu} v-flex-container`}>
                <Logo className= {`${styles.side_menu_logo}`} height = {90}/>
                <div className= {`button ${styles.side_signin_button}`}>
                    <a aria-label="Sign in buttom"><i className={`fa-regular fa-user`}></i>Sign in</a>
                </div>
                <nav className= {`${styles.side_nav_container}`}>
                    <ul>
                        <li>
                            <a>Home</a>
                        </li>
                        <li>
                            <a>Movies</a>
                        </li>
                        <li>
                            <a>About</a>
                        </li>
                        <li>
                            <a>Contact us</a>
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

        
    </div>
  )
}

export default SideNav