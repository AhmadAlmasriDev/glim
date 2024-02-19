import React from "react";
import TrailerButton from "../home/TrailerButton";
import styles from "./styles/MoviePoster.module.css";
import { CloudinaryContext, Image, Transformation } from "cloudinary-react";

const MoviePoster = ({
    title,
    shade,
    poster,
    width,
    buttonType,
    underTitle,
    on_click_function,
}) => {
    return (
        <div
            className={`v-flex-container`}
            style={{ width: width ? width : "unset" }}
        >
            <div className={`${styles.image_container} image-container`}>
                {shade && (
                    <div
                        className={`${styles.poster_shade} image-container`}
                    ></div>
                )}
                <CloudinaryContext cloudName="ahmad-mas">
                    <Image
                        className={`image`}
                        alt={`${title} movie poster`}
                        publicId={poster.substr(53)}
                    >
                        <Transformation width={width} crop="limit" />
                    </Image>
                </CloudinaryContext>
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
