import React from 'react'
import styles from '../styles/TicketForm.module.css'
import FilmDate from './FilmDate'

const TicketForm = () => {
  return (
    <form className={`${styles.main_container}`}>
        <div className={`${styles.button_container} flex-container`}>
          <h3 className={`${styles.time_label}`}>12:00</h3>
          <button className={`${styles.buy_button} button`} type="submit">Buy a ticket</button>
          
        </div>
        <h3 className={`${styles.month}`} >October</h3>
        <ul className={`${styles.time_list}`}>
            <FilmDate/>
            <FilmDate/>
            <FilmDate/>
            <FilmDate/>
            <FilmDate/>
            <FilmDate/>
            <FilmDate/>
            <FilmDate/>
            <FilmDate/>
            <FilmDate/>
            <FilmDate/>
            <FilmDate/>
            <FilmDate/>
            <FilmDate/>
            <FilmDate/>
            <FilmDate/>
           
            
           
            
        </ul>
    </form>
  )
}

export default TicketForm