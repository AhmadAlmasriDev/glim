import React from 'react'
import styles from './styles/LikeCommentCount.module.css'
import {Link} from 'react-router-dom'

const CommentCount = ({id, comments_count}) => {
  return (
    <div className={`${styles.main_container} ${styles.comment} flex-container`}>
        <Link className={`${styles.icon}`} to={`/movies/${id}`}>
          <i className={`fa-regular fa-comments`}/>
        </Link>
        <span className={` ${styles.number}`}>{comments_count}</span>
    </div>
  )
}

export default CommentCount