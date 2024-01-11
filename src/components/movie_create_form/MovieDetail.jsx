import styles from "./styles/MovieDetail.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../asset/Asset";
import React, { useEffect, useState, useContext } from "react";
import MoviePoster from "./MoviePoster";

import LikeCount from "../likes_comments_count/LikeCount";
import DataContext from "../../context/DataContext";
import MovieDetailComment from "./MovieDetailComment";
import MovieDetailSeats from "./MovieDetailSeats";
import MovieDetailInfo from "./MovieDetailInfo";
import MovieDetailWatchItem from "./MovieDetailWatchItem";

const MovieDetail = () => {
    const { id } = useParams();
    const [currentMovie, setCurrentMovie] = useState([]);
    const [hasLoaded, setHasLoaded] = useState(false);
    const { currentUser } = useContext(DataContext);
    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: movie }] = await Promise.all([
                    axiosReq.get(`/movies/${id}`),
                ]);
                setCurrentMovie([movie]);
                setHasLoaded(true);
            } catch (err) {
                console.log(err);
            }
        };
        setHasLoaded(false);
        handleMount();
    }, [id]);
    const main = (
        <div className={`${styles.main_container} flex-container`}>
            <section className={`${styles.poster_section}`}>
                <MoviePoster
                    title={currentMovie[0]?.title}
                    poster={currentMovie[0]?.poster}
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
                                {currentMovie[0]?.title}
                            </h1>
                            <div className={`${styles.movie_like_container}`}>
                                <LikeCount
                                    movies={currentMovie}
                                    movie={currentMovie[0]}
                                    setMovie={setCurrentMovie}
                                />
                            </div>
                        </div>
                        <MovieDetailInfo
                            rated={currentMovie[0]?.rated}
                            year={currentMovie[0]?.year}
                            director={currentMovie[0]?.director}
                            distribution={currentMovie[0]?.distribution}
                            actors={currentMovie[0]?.actors}
                            genre={currentMovie[0]?.genre}
                            start_date={currentMovie[0]?.start_date}
                            end_date={currentMovie[0]?.end_date}
                            discreption={currentMovie[0]?.discreption}
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
                            <MovieDetailWatchItem
                                poster={currentMovie[0]?.poster}
                            />
                            <MovieDetailWatchItem
                                poster={currentMovie[0]?.poster}
                            />
                            <MovieDetailWatchItem
                                poster={currentMovie[0]?.poster}
                            />
                            <MovieDetailWatchItem
                                poster={currentMovie[0]?.poster}
                            />
                            <MovieDetailWatchItem
                                poster={currentMovie[0]?.poster}
                            />
                            <MovieDetailWatchItem
                                poster={currentMovie[0]?.poster}
                            />
                        </ul>
                    </div>
                </section>
                {/* seats section */}
                <section className={`${styles.seats_section}`}>
                    <MovieDetailSeats seats={null} />
                </section>
            </div>
        </div>
    );

    return (
        <article className={`flex-container wrapper`}>
            {hasLoaded ? (
                <>
                    {currentMovie.length ? (
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

export default MovieDetail;
