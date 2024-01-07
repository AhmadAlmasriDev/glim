import React,{useContext} from 'react'
import {OverlayTrigger, Tooltip} from 'react-bootstrap'
import styles from './styles/LikeCommentCount.module.css'
import DataContext from "../../context/DataContext"


const Like = ({is_admin, like_id, likes_count}) => {
  const currentUser = useContext(DataContext)
  return (
    <div className={` ${styles.main_container} ${styles.like} flex-container`}>
      {is_admin ? (
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>Managers can't like movies!</Tooltip>}
        >
          <i className={`fa-regular fa-heart`} />
        </OverlayTrigger>
      ) : like_id ? (
        <span className={`${styles.icon}`} onClick={() => {console.log("unlike clicked")}}>
          <i className={`fa-solid fa-heart`} />
        </span>
      ) : currentUser ? (
        <span className={`${styles.icon}`} onClick={() => {console.log("like clicked")}}>
          <i className={`fa-regular fa-heart`} />
        </span>
      ) : (
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>Log in to like posts!</Tooltip>}
        >
          <i className={`fa-regular fa-heart`} />
        </OverlayTrigger>
      )}
      <span className={` ${styles.number}`}>{likes_count}</span>
    </div>
  )
}



export default Like