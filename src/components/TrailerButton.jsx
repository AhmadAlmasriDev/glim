import React from 'react'
import styles from '../styles/TrailerButton.module.css'


const TrailerButton = ({type}) => {
  return (
    <div className={`${styles.main_container} flex-container`}>
        <button className={`${styles.play_button} flex-container`}>
            
                <i className={`${styles.play_icon} fa-solid fa-play`}></i>
                <h3 className={`${styles.play_text}`}>Watch trailer</h3>
            
        </button>
    </div>
  )
}

export default TrailerButton