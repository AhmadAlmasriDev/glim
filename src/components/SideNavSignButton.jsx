import React from 'react'
import styles from "../styles/SideNav.module.css"
import {NavLink} from 'react-router-dom'

const SideNavSignButton = ({text, target ,icon, onClick}) => {
  return (
    <div  className= {`button ${styles.side_sign_button}`}>
        <NavLink to ={target} onClick= {onClick} aria-label="Sign in buttom"><i className={`${styles.sign_icon} ${icon}`}></i>{text}</NavLink>
    </div>
  )
}

export default SideNavSignButton