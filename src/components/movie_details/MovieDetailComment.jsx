import React from "react";
import SideNavAvatar from "../side_nav/SideNavAvatar";
import { NavLink } from "react-router-dom";
import styles from "./styles/MovieDetail.module.css";

const MovieDetailComment = ({ currentUser }) => {
    return (
        <ul>
            <div className={`${styles.comment_container} flex-container`}>
                <div
                    className={`${styles.comment_avatar_container} v-flex-container`}
                >
                    <SideNavAvatar
                        user={currentUser}
                        width={70}
                        greeting={null}
                    />
                </div>
                <div
                    className={`${styles.comment_text_main_container} v-flex-container`}
                >
                    <div
                        className={`${styles.comment_text_container} v-flex-container`}
                    >
                        <h4 className={`${styles.comment_date}`}>19-10-2023</h4>
                        <p className={`${styles.comment_text}`}>comment text</p>
                    </div>
                    <div
                        className={`${styles.comment_button_container} flex-container`}
                    >
                        <NavLink
                            className={`${styles.comment_edit_button} button`}
                            to="/"
                        >
                            Edit
                        </NavLink>
                        <NavLink
                            className={`${styles.comment_delete_button} button`}
                            to="/"
                        >
                            Delete
                        </NavLink>
                    </div>
                </div>
            </div>
        </ul>
    );
};

export default MovieDetailComment;
