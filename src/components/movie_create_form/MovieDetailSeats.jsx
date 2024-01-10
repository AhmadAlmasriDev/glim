import React from "react";
import styles from "./styles/MovieDetail.module.css";

import MovieDetailSeatItem from "./MovieDetailSeatItem";

const MovieDetailSeats = ({ seats }) => {
    return (
        <div className={`${styles.seats_main_container}`}>
            <div className={`${styles.seats_header_container} flex-container`}>
                <h3 className={`${styles.seats_header}`}>Available seats</h3>
            </div>
            <div className={`v-flex-container`}>
                <hr className={`${styles.seats_screen}`} />
                <h4 className={`${styles.seats_screen_text}`}>screen</h4>
            </div>
            <ul className={`${styles.seats_container}`}>
                <MovieDetailSeatItem reserve={true} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={true} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={true} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={true} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={true} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={true} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={true} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
                <MovieDetailSeatItem reserve={false} />
            </ul>
            <div className={`flex-container`}>
                <button className={`button`}>Book your ticket</button>
            </div>
        </div>
    );
};

export default MovieDetailSeats;
