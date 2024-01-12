import React from "react";
import TrailerButton from "../home/TrailerButton";


const MoviePoster = ({ title, poster, width, buttonType, underTitle, on_click_function }) => {
    return (
        <div className={` v-flex-container`} style={{ width: width }}>
            <div className={`image-container`}>
                <img
                    className={`image`}
                    src={poster}
                    alt={`${title} movie poster`}
                />
            </div>
            <TrailerButton
                on_click_function={on_click_function}
                type={buttonType}
                title={underTitle ? title : null}
            />
        </div>
    );
};

export default MoviePoster;
