import React from "react";
import { Spinner } from "react-bootstrap";
import styles from "./styles/Asset.module.css";

const Asset = ({ spinner, src, message, upload }) => {
    const Upload_image = (
        <div className={`${styles.icon_container} flex-container`}>
            <i className={`${styles.icon} fa-solid fa-angles-up`}></i>
        </div>
    );
    return (
        <div className={`${styles.Asset}  ${styles.main_container} `}>
            {upload && <>{Upload_image}</>}
            {spinner && <Spinner animation="border" />}
            {src && <img src={src} alt={message} />}
            {message && <p className={`${styles.message}`}>{message}</p>}
        </div>
    );
};

export default Asset;
