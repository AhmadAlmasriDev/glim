import React from "react";
import TrailerButton from "../home/TrailerButton";
import styles from "./styles/MovieDetail.module.css";

const MoviePoster = ({ title, poster, width, buttonType, underTitle }) => {
    return (
        <div
            className={`${styles.poster_container} v-flex-container`}
            style={{ width: width }}
        >
            <div className={`image-container`}>
                <img
                    className={`image`}
                    src={poster}
                    alt={`${title} movie poster`}
                />
            </div>
            <TrailerButton
                type={buttonType}
                title={underTitle ? title : null}
            />
        </div>
    );
};

export default MoviePoster;
