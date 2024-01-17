import React from "react";
import TrailerButton from "../home/TrailerButton";
import styles from "./styles/MoviePoster.module.css"

const MoviePoster = ({ id, title, shade, poster, width, buttonType, underTitle, on_click_function}) => {
    return (
        <div className={`v-flex-container`} style={{ width: width }}>
            <div className={`${styles.image_container} image-container`}>
                {shade && <div className={`${styles.poster_shade} image-container`}></div>}
                <img
                    className={`image`}
                    src={poster}
                    alt={`${title} movie poster`}
                />
            </div>
            <TrailerButton
                
                on_click_function = {on_click_function}
                type={buttonType}
                title={underTitle ? title : null}
            />
        </div>
    );
};

export default MoviePoster;
