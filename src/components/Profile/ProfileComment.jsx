import React from "react";
import styles from "./styles/Profile.module.css";
import MoviePoster from "../movie_poster/MoviePoster";
import { Link } from "react-router-dom";

const ProfileComment = ({ currentMovie, comment }) => {
    return (
        <div className={`${styles.comment_container} flex-container`}>
            <Link
                to={`/movies/${currentMovie?.id}`}
                className={`${styles.poster_container}`}
            >
                <MoviePoster poster={currentMovie?.poster} width={100} />
            </Link>
            <div
                className={`${styles.info_main_comment_container} v-flex-container`}
            >
                <div
                    className={` ${styles.info_comment_container} flex-container`}
                >
                    <h3 className={`${styles.info_comments_film}`}>
                        {currentMovie?.title}
                    </h3>
                    <p className={`${styles.info_comments_date}`}>
                        {comment?.created_at}
                    </p>
                </div>
                <div className={`${styles.info_comments_body}`}>
                    <p>{comment?.comment_body}</p>
                </div>
            </div>
        </div>
    );
};

export default ProfileComment;
