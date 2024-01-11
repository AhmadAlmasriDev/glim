import React from "react";
import styles from "./styles/MovieDetail.module.css";

const MovieDetailSeatItem = ({ reserve }) => {
    return (
        <li className={`${styles.seat_item}`}>
            <i
                className={`${
                    reserve ? styles.seat_icon_red : styles.seat_icon_white
                } fa-solid fa-couch`}
            ></i>
        </li>
    );
};

export default MovieDetailSeatItem;
