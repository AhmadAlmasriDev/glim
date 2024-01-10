import React from "react";
import styles from "./styles/MovieDetail.module.css";

const MovieDetailInfoItem = ({ itemName, itemValue }) => {
    return (
        <li className={`${styles.info_item} flex-container`}>
            <div className={`${styles.info_name}`}>{itemName}:</div>
            <div className={`${styles.info_value}`}>{itemValue}</div>
        </li>
    );
};

export default MovieDetailInfoItem;
