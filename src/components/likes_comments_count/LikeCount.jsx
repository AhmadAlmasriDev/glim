import React, { useContext } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import styles from "./styles/LikeCommentCount.module.css";
import DataContext from "../../context/DataContext";
import { axiosRes } from "../../api/axiosDefaults";

const Like = ({ movies, setMovie, movie }) => {
    const { currentUser } = useContext(DataContext);

    /* 
    Like handle
    */
    const handleLike = async () => {
        try {
            const { data } = await axiosRes.post("/likes/", {
                movie: movie.id,
            });
            setMovie(
                movies.map((currentMovie) => {
                    if (currentMovie.id === movie.id) {
                        return {
                            ...currentMovie,
                            likes_count: currentMovie?.likes_count + 1,
                            like_id: data.id,
                        };
                    } else {
                        return currentMovie;
                    }
                })
            );
        } catch (err) {
            console.log(err);
        }
    };

    /* 
    Unlike handle
    */
    const handleUnLike = async () => {
        try {
            const { data } = await axiosRes.delete(`/likes/${movie?.like_id}`);

            setMovie(
                movies.map((currentMovie) => {
                    if (currentMovie.id === movie.id) {
                        return {
                            ...currentMovie,
                            likes_count: currentMovie?.likes_count - 1,
                            like_id: null,
                        };
                    } else {
                        return currentMovie;
                    }
                })
            );
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div
            className={` ${styles.main_container} ${styles.like} flex-container`}
        >
            {movie?.is_admin ? (
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Managers can't like movies!</Tooltip>}
                >
                    <i className={`fa-regular fa-heart`} />
                </OverlayTrigger>
            ) : movie?.like_id ? (
                <span className={`${styles.icon}`} onClick={handleUnLike}>
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

            <span className={` ${styles.number}`}>{movie?.likes_count}</span>
        </div>
    );
};

export default Like;
