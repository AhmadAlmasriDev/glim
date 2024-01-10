import React, { useContext } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import styles from "./styles/LikeCommentCount.module.css";
import DataContext from "../../context/DataContext";
import { axiosRes } from "../../api/axiosDefaults";

const Like = ({ id, setCurrentMovie, currentMovie }) => {

    const currentUser = useContext(DataContext);
    console.log(currentMovie);

    const handleLike = async () => {
        try {
            const { data } = await axiosRes.post("/likes/", { movie: id });
            setCurrentMovie({
                ...currentMovie,
                likes_count: currentMovie?.likes_count + 1,
                like_id: data.id,
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div
            className={` ${styles.main_container} ${styles.like} flex-container`}
        >
            {currentMovie?.is_admin ? (
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Managers can't like movies!</Tooltip>}
                >
                    <i className={`fa-regular fa-heart`} />
                </OverlayTrigger>
            ) : currentMovie?.like_id ? (
                <span
                    className={`${styles.icon}`}
                    onClick={() => {
                        console.log("unlike clicked");
                    }}
                >
                    <i className={`fa-solid fa-heart`} />
                </span>
            ) : currentUser ? (
                <span className={`${styles.icon}`} onClick={handleLike}>
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

            <span className={` ${styles.number}`}>{currentMovie?.likes_count}</span>
        </div>
    );
};

export default Like;
