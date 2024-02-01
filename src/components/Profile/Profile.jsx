import React, { useEffect, useContext, useState } from "react";
import DataContext from "../../context/DataContext";
import SideNavAvatar from "../side_nav/SideNavAvatar";
import styles from "./styles/Profile.module.css";
import MoviePoster from "../movie_poster/MoviePoster";
const Profile = () => {
    const { currentUser } = useContext(DataContext);

    return (
        <article className={`flex-container wrapper`}>
            <section
                className={`${styles.profile_main_container} flex-container`}
            >
                <div
                    className={`${styles.profile_avatar_container} flex-container`}
                >
                    <SideNavAvatar />
                </div>
                <div
                    className={`${styles.profile_info_container} v-flex-container`}
                >
                    <div
                        className={`${styles.user_name_main_container} flex-container`}
                    >
                        <h4 className={`${styles.profile_header}`}>Name:</h4>
                        <div>
                            <p className={`${styles.user_name} flex-container`}>
                                name
                            </p>
                        </div>
                    </div>
                    <div
                        className={`${styles.user_email_main_container} flex-container`}
                    >
                        <h4 className={`${styles.profile_header}`}>e-mail:</h4>
                        <div>
                            <p
                                className={`${styles.user_email} flex-container`}
                            >
                                name
                            </p>
                        </div>
                    </div>
                    <div
                        className={`${styles.user_about_main_container} flex-container`}
                    >
                        <h4 className={`${styles.profile_header}`}>About:</h4>
                        <div>
                            <p
                                className={`${styles.user_about} flex-container`}
                            >
                                name
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <div>
                <div>
                    <div>
                        <MoviePoster />
                    </div>
                    <div>
                        <h3>film</h3>
                        <p>date</p>
                        <p>time</p>
                    </div>
                    <div>
                        <p>{`Row: `}</p>
                        <p>{`Seat: `}</p>
                        <p>standard</p>
                    </div>
                </div>
            </div>
            <section></section>
        </article>
    );
};

export default Profile;
