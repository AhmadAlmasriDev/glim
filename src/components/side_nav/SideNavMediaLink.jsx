import React from "react";
import styles from "./styles/SideNav.module.css";

const SideNavMediaLink = ({ brand, link }) => {
    const label =
        brand.slice(0, 1).toUpperCase() + brand.slice(1, brand.length);
    return (
        <li>
            <a
                className={`${styles.media_link} flex-container`}
                aria-label={`${label} link`}
                href={link}
                target="_blank"
            >
                <div className={`${styles.media_logo} flex-container`}>
                    <i className={`fa-brands fa-${brand}`}></i>
                </div>
                {label}
            </a>
        </li>
    );
};

export default SideNavMediaLink;
