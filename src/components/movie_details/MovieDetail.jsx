import styles from "./styles/MovieDetail.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../asset/Asset";
import React, { useEffect, useState, useContext } from "react";

import LikeCount from "../likes_comments_count/LikeCount";
import DataContext from "../../context/DataContext";
import MovieDetailComment from "./MovieDetailComment";
import MovieDetailSeats from "./MovieDetailSeats";
import MovieDetailInfo from "./MovieDetailInfo";
import MovieDetailWatchItem from "./MovieDetailWatchItem";
import MoviePoster from "../movie_poster/MoviePoster";
import MovieTrailer from "../trailer/MovieTrailer";
import MovieDetailcommentForm from "./MovieDetailcommentForm";

const MovieDetail = () => {
    const { id } = useParams();
    const [currentMovie, setCurrentMovie] = useState([]);
    const [hasLoaded, setHasLoaded] = useState(false);
    const [comments, setComments] = useState({ results: [] });

    const { currentUser, showTrailer, setShowTrailer } =
        useContext(DataContext);

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: movie }, { data: comments }] = await Promise.all(
                    [
                        axiosReq.get(`/movies/${id}`),
                        axiosReq.get(`/comments/?movie=${id}`),
                    ]
                );
                setCurrentMovie([movie]);
                setComments(comments);
                setHasLoaded(true);
            } catch (err) {
                console.log(err);
            }
        };
        setHasLoaded(false);
        handleMount();
    }, [id]);

    const notApproved = () => {
        let flag = false;
        comments?.results?.map((comment) => {
            if (comment.is_owner & (comment.approved == false)) flag = true;
        });
        return flag;
    };

    const main = (
        <div className={`${styles.main_container} flex-container`}>
            <section className={`${styles.poster_section}`}>
                <MoviePoster
                    on_click_function={setShowTrailer}
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

                    {/* Comments */}
                    <div className={`${styles.comments_main_container}`}>
                        <h3 className={`${styles.comments_header}`}>
                            Comments
                        </h3>

                        <MovieDetailcommentForm
                            currentUser={currentUser}
                            setCurrentMovie={setCurrentMovie}
                            currentMovie={currentMovie}
                            setComments={setComments}
                            notApproved={notApproved()}
                        />

                        {comments?.results?.length ? (
                            comments?.results?.map(
                                (comment) =>
                                    comment?.approved && (
                                        <MovieDetailComment
                                            key={comment?.id}
                                            comment={comment}
                                            setComments={setComments}
                                            setCurrentMovie={setCurrentMovie}
                                        />
                                    )
                            )
                        ) : (
                            <div className={`flex-container`}>
                                <h4>No comments available</h4>
                            </div>
                        )}
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
            {showTrailer ? (
                <MovieTrailer
                    trailer_link={currentMovie[0]?.trailer}
                    title={currentMovie[0]?.title}
                />
            ) : hasLoaded ? (
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
