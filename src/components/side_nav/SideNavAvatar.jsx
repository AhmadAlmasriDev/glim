import React from 'react'
import {NavLink} from 'react-router-dom'
import styles from "./styles/SideNav.module.css"

const SideNavAvatar = ({currentUser, width}) => {
    console.log(currentUser)
  return (
    <div className={`v-flex-container`}>
        <img src={currentUser?.profile_avatar}  width = {width} height= {width} className={`${styles.avatar_image}`} alt="User Avatar" />
        <h3 className={`${styles.avatar_name}`}>Hello, {currentUser?.username} </h3>

    </div>
    
  )
}

export default SideNavAvatar