import React from "react";
import { Spinner } from "react-bootstrap";
import styles from "./styles/Asset.module.css";

const Asset = ({ spinner, src, message, upload }) => {
    const upload_image = (
        <div className={`${styles.icon_container} flex-container`}>
            <i className={`${styles.icon} fa-solid fa-angles-up`}></i>
        </div>
    );

    return (
        <div className={`${styles.Asset}  ${styles.main_container} `}>
            {upload && <>{upload_image}</>}
            {spinner && <Spinner animation="border" />}
            {src && (
                <div className={`image-container`}>
                    <img className={`image`} src={src} alt={message} />
                </div>
            )}
            {message && <p className={`${styles.message}`}>{message}</p>}
        </div>
    );
};

export default Asset;
