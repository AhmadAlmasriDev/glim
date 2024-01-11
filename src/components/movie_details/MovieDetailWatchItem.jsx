import React from "react";
import styles from "./styles/MovieDetail.module.css";
import { NavLink } from "react-router-dom";
import MoviePoster from "../movie_poster/MoviePoster";

const MovieDetailWatchItem = ({ poster }) => {
    return (
        <li className={`${styles.movies_watch_item}`}>
            <NavLink to="/">
                <MoviePoster
                    title={"test title"}
                    poster={poster}
                    width={150}
                    buttonType={0}
                    underTitle={true}
                />
            </NavLink>
        </li>
    );
};

export default MovieDetailWatchItem;
