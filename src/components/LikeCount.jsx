import React from 'react'
import styles from '../styles/LikeCommentCount.module.css'


const Like = ({liked}) => {
  return (
    <div className={` ${styles.main_container} ${styles.like} flex-container`}>
      { {liked} ? <i className={`fa-regular fa-heart`}></i> : <i className={`fa-solid fa-heart`}></i>}
      <p className={` ${styles.number}`}>32</p>
    </div>
  )
}

export default Like