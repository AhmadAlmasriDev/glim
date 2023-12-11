import React from 'react'
import styles from '../styles/FilmCarousel.module.css'
import image from '../assets/test.jpg'

const FilmBanner = () => {
  return (
    
      <div className={`${styles.film_background} flex-container`} style={{backgroundImage: ` linear-gradient(to bottom, rgba(0,0,0,0)50%, rgba(0,0,0,.9)90%, rgba(0,0,0,1)), url(${image})`}}>
        <div className={`${styles.content_background} flex-container`}>

        </div>
      </div>

    
  
        
    
  )
}

export default FilmBanner