import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./styles/SideNav.module.css";

const SideNavAvatar = ({
    user,
    width,
    greating,
    profile_avatar,
    owner_name,
    show_name,
}) => {
    return (
        <div className={`${styles.avatar_container} v-flex-container`}>
            <img
                // src={user ? user?.profile_avatar : profile_avatar}
                src={profile_avatar ? profile_avatar : user?.profile_avatar}
                width={width}
                height={width}
                className={`${styles.avatar_image}`}
                alt="User Avatar"
            />
            {show_name && (
                <h3 className={`${styles.avatar_name}`}>
                    {/* {greating && "Hello,"} {user ? user?.username : owner_name} */}
                    {greating && "Hello,"}
                    {owner_name ? owner_name : user?.username}
                </h3>
            )}
        </div>
    );
};

export default SideNavAvatar;
