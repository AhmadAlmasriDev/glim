import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./styles/SideNav.module.css";

const SideNavAvatar = ({ user, width, greating }) => {
    return (
        <div className={`v-flex-container`}>
            <img
                src={user?.profile_avatar}
                width={width}
                height={width}
                className={`${styles.avatar_image}`}
                alt="User Avatar"
            />
            <h3 className={`${styles.avatar_name}`}>
                {greating && "Hello,"} {user?.username}{" "}
            </h3>
        </div>
    );
};

export default SideNavAvatar;
