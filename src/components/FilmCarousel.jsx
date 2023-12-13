import React from 'react'
import styles from '../styles/FilmCarousel.module.css'
import FilmBanner from './FilmBanner';


const FilmCarousel = () => {
    
    return (

      <article className={`${styles.main_container} flex-container`}>
        <div className={`${styles.carousel_container} flex-container`}>
          <FilmBanner/>
          <FilmBanner/>

        </div>
      </article>
      
    );
}

export default FilmCarousel