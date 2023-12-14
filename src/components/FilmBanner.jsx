import React from 'react'
import styles from '../styles/FilmBanner.module.css'
import image from '../assets/test.jpg'
import LikeCount from './LikeCount'
import CommentCount from './CommentCount'
import TrailerButton from './TrailerButton'
import TicketForm from './TicketForm'


const FilmBanner = () => {
  const liked = true
  const type = ''
  return (

      <div className={`${styles.film_background} flex-container`} style={{backgroundImage: ` linear-gradient(to bottom, rgba(0,0,0,0)50%, rgba(0,0,0,.9)90%, rgba(0,0,0,1)), url(${image})`}}>
        <div className={`${styles.content_background} v-flex-container`}>
          <div className={`${styles.content_container}`}>
            <div className={`v-flex-container`}>
              <section className={`v-flex-container`}>
                <div className={`flex-container`}>
                  <LikeCount  liked = {liked}/>
                  <CommentCount/>
                </div>
                <TrailerButton type = {type}/>
              </section>
              <section className={`${styles.form_section} flex-container`}>
                <TicketForm/>
              </section>
            </div>
          </div>
          <div className={`${styles.film_title} flex-container`}>
            <a>Film Title</a>
          </div>
        </div>
      </div>

    
  
        
    
  )
}

export default FilmBanner