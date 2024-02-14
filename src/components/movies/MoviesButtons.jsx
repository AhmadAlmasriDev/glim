import React from "react";
import styles from "./styles/Movies.module.css";
import { Link } from "react-router-dom";

const MoviesButtons = ({ id, title, setMovieToDelete }) => {
    /*
    Delete handle function
    */
    const handelDelete = () => {
        setMovieToDelete({
            id: id,
            title: title,
        });
    };

    return (
        <div>
            <Link
                className={`${styles.edit_button} button`}
                to={`/movies/${id}/edit`}
            >
                Edit
            </Link>
            <button
                className={`${styles.delete_button} button`}
                onClick={handelDelete}
            >
                Delete
            </button>
        </div>
    );
};

export default MoviesButtons;
