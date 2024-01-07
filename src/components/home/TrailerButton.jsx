import React from "react";
import styles from "./styles/TrailerButton.module.css";

const TrailerButton = ({ type }) => {
    const handleType = (param) => {
        switch (param) {
            case 100:
                return styles.width_100;
                break;
            case 75:
                return styles.width_75;
                break;
            default:
                return styles.display_non;
        }
    };
    return (
        <div className={`flex-container ${handleType(type)}`}>
            {console.log(handleType(type))}
            {console.log(type)}
            <button className={`${styles.play_button} flex-container`}>
                <i className={`${styles.play_icon} fa-solid fa-play`}></i>
                <h3 className={`${styles.play_text}`}>Watch trailer</h3>
            </button>
        </div>
    );
};

export default TrailerButton;
