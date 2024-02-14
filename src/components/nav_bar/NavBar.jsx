import React from "react";
import Logo from "../Logo";
import styles from "./styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import DataContext from "../../context/DataContext";
import UserLogNotification from "./UserLogNotification";

const NavBar = () => {
    const { handleToggleSideBar } = useContext(DataContext);

    return (
        <header className={`flex-container ${styles.header}`}>
            <nav>
                <ul>
                    <li className={`${styles.bar_menu}`}>
                        <a
                            aria-label="bar menu button"
                            onClick={handleToggleSideBar}
                        >
                            <i className={`fa-solid fa-bars`}></i>
                        </a>
                    </li>
                </ul>
            </nav>
            <NavLink className={`${styles.header_logo}`} to="/">
                <Logo height={45} />
            </NavLink>

            <UserLogNotification />
        </header>
    );
};

export default NavBar;
