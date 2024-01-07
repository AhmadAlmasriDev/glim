import React from "react";
import TrailerButton from "../home/TrailerButton";

const MoviePoster = ({ title, poster, width, buttonType }) => {
    return (
        <section>
            <div className={`image-container`} style={{ width: width }}>
                <img
                    className={`image`}
                    src={poster}
                    alt={`${title} movie poster`}
                />
                <TrailerButton type={buttonType} />
            </div>
        </section>
    );
};

export default MoviePoster;
