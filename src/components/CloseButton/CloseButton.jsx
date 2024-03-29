import React from "react";
import styles from "./styles/CloseButton.module.css";

const CloseButton = ({ on_click_function }) => {
    return (
        <button
            aria-label="close button"
            className={`${styles.close_button}`}
            onClick={() => on_click_function(false)}
        >
            <i className="fa-solid fa-xmark"></i>
        </button>
    );
};

export default CloseButton;
