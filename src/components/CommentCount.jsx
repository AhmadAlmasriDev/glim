import React from 'react'
import styles from '../styles/LikeCommentCount.module.css'

const CommentCount = () => {
  return (
    <div className={`${styles.main_container} ${styles.comment} flex-container`}>
        <i className={`fa-regular fa-comments`}></i>
        <p className={` ${styles.number}`}>20</p>
    </div>
  )
}

export default CommentCount