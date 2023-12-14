import React from 'react'
import styles from '../styles/FilmDate.module.css'

const FilmDate = () => {
  return (
    <li className={`${styles.list_item}`}>
        <input className={`${styles.list_item_input}`} type='radio' id='date1' name='film_date' value='12'/>
        <label className={`${styles.list_item_label}`} htmlFor='date1'>12</label>
    </li>
  )
}

export default FilmDate