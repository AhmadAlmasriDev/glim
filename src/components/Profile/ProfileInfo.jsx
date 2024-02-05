import React from "react";
import styles from "./styles/Profile.module.css";
import SideNavAvatar from "../side_nav/SideNavAvatar";
import { NavLink } from "react-router-dom";

const ProfileInfo = ({ profile, currentUser, infoToggle, setInfoToggle }) => {
    const handleTicketsClick = () => setInfoToggle(true);
    const handleCommentsClick = () => setInfoToggle(false);
    return (
        <section
            className={`${styles.profile_main_container} v-flex-container`}
        >
            <NavLink
                to={`/profiles/${currentUser?.profile_id}/edit`}
                className={`${styles.profile_edit_button_container} flex-container`}
            >
                <button className={`${styles.profile_edit_button} button`}>
                    Edit
                </button>
            </NavLink>
            <div
                className={`${styles.profile_avatar_container} flex-container`}
            >
                <SideNavAvatar user={currentUser} width={200} />
            </div>
            <div className={`${styles.info_main_container} v-flex-container`}>
                <div
                    className={`${styles.info_left_container} v-flex-container`}
                >
                    <div
                        className={`${styles.user_name_main_container} v-flex-container`}
                    >
                        <h4 className={`${styles.profile_header}`}>Name:</h4>
                        <p className={`${styles.user_name}`}>{profile?.name}</p>
                    </div>
                    <div
                        className={`${styles.user_email_main_container} v-flex-container`}
                    >
                        <h4 className={`${styles.profile_header}`}>e-mail:</h4>

                        <p className={`${styles.user_email}`}>
                            {profile?.email}
                        </p>
                    </div>
                </div>
                <div
                    className={`${styles.user_about_main_container} v-flex-container`}
                >
                    <h4 className={`${styles.profile_header}`}>About:</h4>

                    <p className={`${styles.user_about}`}>{profile?.about}</p>
                </div>

                <div
                    className={` ${styles.profile_buttons_container} v-flex-container`}
                >
                    <button
                        className={`${styles.profile_tickets_button} ${
                            infoToggle && styles.profile_button_active
                        } button`}
                        onClick={handleTicketsClick}
                    >
                        My Tickets
                    </button>
                    <button
                        className={`${styles.profile_comments_button} ${
                            !infoToggle && styles.profile_button_active
                        } button`}
                        onClick={handleCommentsClick}
                    >
                        My Comments
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ProfileInfo;
