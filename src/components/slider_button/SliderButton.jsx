import React from "react";
import styles from "./styles/SliderButton.module.css";

const SliderButton = ({ on_click_function, direction }) => {
    return (
        <button
            onClick={() => on_click_function(false)}
            className={`${styles.button_container} flex-container`}
        >
            <i
                className={`${styles.button_icon} fa-solid fa-angles-${direction}`}
            ></i>
        </button>
    );
};

export default SliderButton;
