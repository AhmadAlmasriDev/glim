import React from 'react'
import styles from "./styles/Movies.module.css"
import {Link} from "react-router-dom"

const MoviesButtons = ({id}) => {
  return (
    <div>
        <Link className={`${styles.edit_button} button`} to = {`/movies/${id}/edit`}>Edit</Link>
        <Link className={`${styles.delete_button} button`} to ={`/`}>Delete</Link>
    </div>
  )
}

export default MoviesButtons