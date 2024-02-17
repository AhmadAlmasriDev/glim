import React, { useContext, useEffect, useState } from "react";
import styles from "./styles/Movies.module.css";
import DataContext from "../../context/DataContext";
import MoviePoster from "../movie_poster/MoviePoster";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import Moment from "moment";
import { Link } from "react-router-dom";
import MoviesButtons from "./MoviesButtons";
import Asset from "../asset/Asset";
import CloseButton from "../CloseButton/CloseButton";

const Movies = () => {
    const [hasLoaded, setHasLoaded] = useState(false);
    const [movies, setMovies] = useState([]);
    const { currentUser } = useContext(DataContext);
    const momentObj = Moment().format("MM/DD/YYYY");
    const currentDate = Moment(momentObj, "MM/DD/YYYY");
    const [movieToDelete, setMovieToDelete] = useState(null);

    /* 
    Fetch movies list
    */
    useEffect(() => {
        const fetchmovies = async () => {
            try {
                const { data } = await axiosReq.get(`/movies`);
                setMovies(data);
                setHasLoaded(true);
            } catch (err) {
                console.log(err);
            }
        };

        setHasLoaded(false);
        fetchmovies();
    }, [currentUser]);
    /* 
    Close handle function
    */
    const handleClose = () => {
        setMovieToDelete(null);
    };
    /* 
    Delete handle function
    */
    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/movies/${movieToDelete?.id}`);
            setMovies((prevMovies) =>
                prevMovies.filter((movie) => movie.id !== movieToDelete?.id)
            );
            setMovieToDelete(null);
        } catch (err) {
            console.log(err);
        }
    };

    const main = (
        <div className={`${styles.movies_wrapper} wrapper flex-container`}>
            {movieToDelete ? (
                <div
                    className={`${styles.movies_delete_main_container} flex-container`}
                >
                    <div
                        className={`${styles.movies_delete_container} v-flex-container`}
                    >
                        <div
                            className={`${styles.movies_delete_close_container} flex-container`}
                        >
                            <CloseButton on_click_function={handleClose} />
                        </div>
                        <div
                            className={`${styles.movies_delete_message} v-flex-container`}
                        >
                            <h3>Delete this movie?</h3>
                            <h3>{movieToDelete?.title}</h3>
                            <button className={`button`} onClick={handleDelete}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div
                    className={`${styles.movies_page_container} v-flex-container`}
                >
                    <div
                        className={`${styles.movies_page_title_container} flex-container`}
                    >
                        <h1 className={`${styles.movies_page_title}`}>
                            Movies
                        </h1>
                        {movies[0]?.is_admin && (
                            <Link
                                className={`${styles.movies_add_button} button`}
                                to="movies/add-movie"
                            >
                                Add +
                            </Link>
                        )}
                    </div>

                    <section
                        className={`${styles.movies_main_container} v-flex-container`}
                    >
                        <h3 className={`${styles.section_title}`}>
                            In theatres now
                        </h3>
                        <div
                            className={`${styles.movies_container} flex-container`}
                        >
                            {movies?.map(
                                (movie, idx) =>
                                    Moment(
                                        movie?.end_date,
                                        "MM/DD/YYYY"
                                    ).isSameOrAfter(currentDate) && (
                                        <div
                                            key={idx}
                                            className={`${styles.movie_item_container} v-flex-container`}
                                        >
                                            <Link
                                                to={`/movies/${movie?.id}`}
                                                className={`${styles.movie_item} v-flex-container`}
                                            >
                                                <MoviePoster
                                                    key={idx}
                                                    width={240}
                                                    title={movie?.title}
                                                    shade={true}
                                                    poster={movie?.poster}
                                                    underTitle={false}
                                                />
                                                <div
                                                    className={`${styles.movie_item_title_container} v-flex-container`}
                                                >
                                                    <h3
                                                        className={`${styles.movie_item_title}`}
                                                    >
                                                        {movie?.title}
                                                    </h3>
                                                </div>
                                            </Link>
                                            {movie?.is_admin && (
                                                <MoviesButtons
                                                    id={movie?.id}
                                                    title={movie?.title}
                                                    setMovieToDelete={
                                                        setMovieToDelete
                                                    }
                                                />
                                            )}
                                        </div>
                                    )
                            )}
                        </div>
                    </section>
                    <section
                        className={`${styles.movies_main_container} v-flex-container`}
                    >
                        <h3 className={`${styles.section_title}`}>
                            Old entries
                        </h3>
                        <div
                            className={`${styles.movies_container} flex-container`}
                        >
                            {movies?.map(
                                (movie, idx) =>
                                    Moment(
                                        movie?.end_date,
                                        "MM/DD/YYYY"
                                    ).isBefore(currentDate) && (
                                        <div
                                            key={idx}
                                            className={`${styles.movie_item_container} v-flex-container`}
                                        >
                                            <Link
                                                to={`/movies/${movie?.id}`}
                                                className={`${styles.movie_item} v-flex-container`}
                                            >
                                                <MoviePoster
                                                    key={idx}
                                                    title={movie?.title}
                                                    shade={true}
                                                    poster={movie?.poster}
                                                    underTitle={false}
                                                />
                                                <div
                                                    className={`${styles.movie_item_title_container} v-flex-container`}
                                                >
                                                    <h3
                                                        className={`${styles.movie_item_title}`}
                                                    >
                                                        {movie?.title}{" "}
                                                    </h3>
                                                </div>
                                            </Link>
                                            {movie?.is_admin && (
                                                <MoviesButtons
                                                    id={movie?.id}
                                                    title={movie?.title}
                                                    setMovieToDelete={
                                                        setMovieToDelete
                                                    }
                                                />
                                            )}
                                        </div>
                                    )
                            )}
                        </div>
                    </section>
                </div>
            )}
        </div>
    );
    return (
        <article
            className={`${styles.movies_article_container} wrapper flex-container`}
        >
            {hasLoaded ? (
                <>
                    {movies.length ? (
                        main
                    ) : (
                        <div>
                            <Asset message={"No items to display"} />
                        </div>
                    )}
                </>
            ) : (
                <div className={`flex-container`}>
                    <Asset spinner />
                </div>
            )}
        </article>
    );
};

export default Movies;
