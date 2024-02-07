import React from "react";
import { NavLink } from "react-router-dom";

import SideNavMediaLink from "./SideNavMediaLink";
import SideNavAvatar from "./SideNavAvatar";
import Logo from "../Logo";
import styles from "./styles/SideNav.module.css";
import SideNavSignButton from "./SideNavSignButton";
import { useContext, useRef, useEffect } from "react";
import DataContext from "../../context/DataContext";
import axios from "axios";
import CloseButton from "../CloseButton/CloseButton";

const SideNav = () => {
    const { viewSideNav, setViewSideNav, currentUser, setCurrentUser } =
        useContext(DataContext);

    const handleSignOut = async () => {
        try {
            await axios.post("/dj-rest-auth/logout/");
            setCurrentUser(null);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const handleClickOutside = () => setViewSideNav(false);

        document.addEventListener("mouseup", handleClickOutside);

        return () => {
            document.removeEventListener("mouseup", handleClickOutside);
        };
    }, []);

    const loggedOutUser = (
        <div className={`${styles.logged_out_user_container} v-flex-container`}>
            <SideNavSignButton
                text="Sign in"
                target="/signin"
                onClick={null}
                icon="fa-regular fa-user"
            />
        </div>
    );
    const loggedInUser = (
        <div className={`v-flex-container`}>
            {/* <NavLink to={`/profiles/${currentUser?.profile_id}`}> */}
            <SideNavAvatar user={currentUser} width={100} show_name={true} />
            {/* </NavLink> */}

            <NavLink
                className={`${styles.my_cabinet_link}`}
                to={`/profiles/${currentUser?.profile_id}`}
            >
                My cabinet
            </NavLink>
        </div>
    );
    return (
        <aside className={`main-container`}>
            <div
                className={`${styles.blur} ${viewSideNav ? "" : "display-non"}`}
            ></div>

            <div
                className={`${styles.background}  v-flex-container ${
                    viewSideNav
                        ? styles.background_view
                        : styles.background_hide
                }`}
            >
                <div
                    className={`flex-container ${styles.close_button_container}`}
                >
                    <CloseButton on_click_function={setViewSideNav} />
                </div>
                <div className={`${styles.side_menu} v-flex-container`}>
                    <NavLink to="/">
                        <Logo
                            className={`${styles.side_menu_logo}`}
                            height={90}
                        />
                    </NavLink>
                    {currentUser ? loggedInUser : loggedOutUser}

                    <nav className={`${styles.side_nav_container}`}>
                        <ul>
                            <li>
                                <NavLink
                                    className={`${styles.side_nav_link}`}
                                    to="/"
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className={`${styles.side_nav_link}`}
                                    to="/movies"
                                >
                                    Movies
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className={`${styles.side_nav_link}`}
                                    to="/about"
                                >
                                    About
                                </NavLink>
                            </li>
                            {/* <li>
                                <NavLink
                                    className={`${styles.side_nav_link}`}
                                    to="/contact"
                                >
                                    Contact us
                                </NavLink>
                            </li> */}
                        </ul>

                        <ul className={`${styles.media_links_container}`}>
                            <SideNavMediaLink brand={"facebook"} />
                            <SideNavMediaLink brand={"twitter"} />
                            <SideNavMediaLink brand={"instagram"} />
                            <SideNavMediaLink brand={"youtube"} />
                        </ul>
                    </nav>
                </div>
                <div
                    className={`${styles.sign_out_link_container} flex-container`}
                >
                    {currentUser && (
                        <SideNavSignButton
                            text="Sign out"
                            target="/"
                            onClick={handleSignOut}
                            icon="fa-solid fa-arrow-right-from-bracket"
                        />
                    )}
                </div>
            </div>
        </aside>
    );
};

export default SideNav;
