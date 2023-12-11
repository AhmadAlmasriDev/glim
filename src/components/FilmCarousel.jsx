import React from 'react'
import styles from '../styles/FilmCarousel.module.css'
import FilmBanner from './FilmBanner';


const FilmCarousel = () => {
    
    return (
      <div className={`${styles.main_container} flex-container`}>
        <FilmBanner/>
        <FilmBanner/>

      </div>
      
    );
}

export default FilmCarousel