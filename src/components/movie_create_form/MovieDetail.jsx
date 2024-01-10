import styles from "./styles/MovieDetail.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

import React, { useEffect, useState, useContext } from "react";
import MoviePoster from "./MoviePoster";
import MovieDetailInfoItem from "./MovieDetailInfoItem";
import MovieDetailSeatItem from "./MovieDetailSeatItem";
import LikeCount from "../likes_comments_count/LikeCount";
import DataContext from "../../context/DataContext";
import MovieDetailComment from "./MovieDetailComment";
import MovieDetailSeats from "./MovieDetailSeats";
import MovieDetailInfo from "./MovieDetailInfo";
import MovieDetailWatchItem from "./MovieDetailWatchItem";

const MovieDetail = () => {
    const { id } = useParams();
    const [currentMovie, setCurrentMovie] = useState({});
    const { currentUser } = useContext(DataContext);
    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: movie }] = await Promise.all([
                    axiosReq.get(`/movies/${id}`),
                ]);
                setCurrentMovie(movie);
                console.log(movie);
            } catch (err) {
                console.log(err);
            }
        };
        handleMount();
    }, [id]);

    const {
        actors,
        comments_count,
        created_at,
        director,
        discreption,
        distribution,
        end_date,
        genre,
        is_admin,
        like_id,
        likes_count,
        manager,
        manager_name,
        poster,
        price,
        rated,
        session_time,
        start_date,
        status,
        title,
        trailer,
        updated_at,
        year,
    } = currentMovie;

    return (
        <article className={`flex-container wrapper`}>
            <div className={`${styles.main_container} flex-container`}>
                <section className={`${styles.poster_section}`}>
                    <MoviePoster
                        title={title}
                        poster={poster}
                        width={250}
                        buttonType={100}
                    />
                </section>
                {/* The right side container used later to reverse the flex container */}
                <div className={`${styles.right_container} flex-container`}>
                    {/* info section */}
                    <section className={`${styles.info_main_container}`}>
                        <div>
                            <div
                                className={`${styles.movie_title_container} flex-container`}
                            >
                                <h1 className={`${styles.movie_title}`}>
                                    {title}
                                </h1>
                                <div
                                    className={`${styles.movie_like_container}`}
                                >
                                    <LikeCount
                                        is_admin={false}
                                        likes_count={25}
                                        like_id={true}
                                    />
                                </div>
                            </div>
                            <MovieDetailInfo
                                rated={rated}
                                year={year}
                                director={director}
                                distribution={distribution}
                                actors={actors}
                                genre={genre}
                                start_date={start_date}
                                end_date={end_date}
                                discreption={discreption}
                            />
                        </div>
                        <div className={`${styles.comments_main_container}`}>
                            <h3 className={`${styles.comments_header}`}>
                                Comments
                            </h3>

                            <MovieDetailComment currentUser={currentUser} />
                            <MovieDetailComment currentUser={currentUser} />
                            <MovieDetailComment currentUser={currentUser} />
                            <MovieDetailComment currentUser={currentUser} />
                        </div>
                        {/* Other movies to watch */}
                        <div>
                            <h3 className={`${styles.movies_watch_header}`}>
                                Movies to watch
                            </h3>
                            <ul className={`${styles.movies_watch_container}`}>
                                <MovieDetailWatchItem poster={poster} />
                                <MovieDetailWatchItem poster={poster} />
                                <MovieDetailWatchItem poster={poster} />
                                <MovieDetailWatchItem poster={poster} />
                                <MovieDetailWatchItem poster={poster} />
                                <MovieDetailWatchItem poster={poster} />
                            </ul>
                        </div>
                    </section>
                    {/* seats section */}
                    <section className={`${styles.seats_section}`}>
                        <MovieDetailSeats seats={null} />
                    </section>
                </div>
            </div>
        </article>
    );
};

export default MovieDetail;
