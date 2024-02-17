import React from "react";
import styles from "./styles/SideNav.module.css";
import { CloudinaryContext, Image, Transformation } from "cloudinary-react";

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
            <CloudinaryContext cloudName="ahmad-mas">
                <Image
                    className={`${styles.avatar_image}`}
                    alt="User Avatar"
                    publicId={
                        profile_avatar
                            ? profile_avatar.substr(53)
                            : user?.profile_avatar.substr(53)
                    }
                >
                    <Transformation width={width} crop="limit" />
                </Image>
            </CloudinaryContext>
            {/* <img
                src={profile_avatar ? profile_avatar : user?.profile_avatar}
                width={width}
                height={width}
                className={`${styles.avatar_image}`}
                alt="User Avatar"
            /> */}
            {show_name && (
                <h3 className={`${styles.avatar_name}`}>
                    {greating && "Hello,"}
                    {owner_name ? owner_name : user?.username}
                </h3>
            )}
        </div>
    );
};

export default SideNavAvatar;
