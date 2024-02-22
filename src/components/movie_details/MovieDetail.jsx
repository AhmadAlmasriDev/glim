import styles from "./styles/MovieDetail.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../asset/Asset";
import React, { useEffect, useState, useContext } from "react";
import LikeCount from "../likes_comments_count/LikeCount";
import DataContext from "../../context/DataContext";
import MovieDetailComment from "./MovieDetailComment";
import MovieDetailInfo from "./MovieDetailInfo";
import MoviePoster from "../movie_poster/MoviePoster";
import MovieTrailer from "../trailer/MovieTrailer";
import MovieDetailcommentForm from "./MovieDetailcommentForm";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import TicketForm from "../home/TicketForm";
import { useHistory } from "react-router-dom";

const MovieDetail = () => {
    const { id } = useParams();
    const [currentMovie, setCurrentMovie] = useState([]);
    const [allRatings, setAllRatings] = useState([]);
    const [hasLoaded, setHasLoaded] = useState(false);
    const [comments, setComments] = useState({ results: [] });
    const { currentUser, showTrailer, setShowTrailer } =
        useContext(DataContext);
    const history = useHistory();

    /*
    Check if previous page is "/" and set trailer triger  
    */
    useEffect(() => {
        console.log(history?.location?.state?.prevPath);
        if (history?.location?.state?.prevPath != "/") {
            setShowTrailer(false);
        }
    }, [history]);
    /*
    Fetch the movies list, comments, and rating categories  
    */
    useEffect(() => {
        const handleMount = async () => {
            try {
                const [
                    { data: movie },
                    { data: comments },
                    { data: all_ratings },
                ] = await Promise.all([
                    axiosReq.get(`/movies/${id}`),
                    axiosReq.get(`/comments/?movie=${id}`),
                    axiosReq.get(`/movies/service`),
                ]);
                setCurrentMovie([movie]);
                setComments(comments);
                setAllRatings(all_ratings[0].service.ratings);
                setHasLoaded(true);
            } catch (err) {
                console.log(err);
            }
        };
        setHasLoaded(false);
        handleMount();
    }, [id]);

    /*
    Check if the comment is approved or not
    */
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
            {/* The right side container is used to reverse the flex container for responsiveness*/}

            <div className={`${styles.right_container} flex-container`}>
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
                            all_ratings={allRatings}
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

                        <MovieDetailcommentForm
                            currentUser={currentUser}
                            setCurrentMovie={setCurrentMovie}
                            currentMovie={currentMovie}
                            setComments={setComments}
                            notApproved={notApproved()}
                        />
                        <InfiniteScroll
                            children={
                                comments?.results?.length ? (
                                    comments?.results?.map(
                                        (comment) =>
                                            comment?.approved && (
                                                <MovieDetailComment
                                                    key={comment?.id}
                                                    comment={comment}
                                                    setComments={setComments}
                                                    setCurrentMovie={
                                                        setCurrentMovie
                                                    }
                                                />
                                            )
                                    )
                                ) : (
                                    <div className={`flex-container`}>
                                        <h4>No comments available</h4>
                                    </div>
                                )
                            }
                            dataLength={comments.results.length}
                            loader={<Asset spinner />}
                            hasMore={!!comments.next}
                            next={() => fetchMoreData(comments, setComments)}
                        />
                    </div>
                </section>
                <section className={`${styles.tickets_section}`}>
                    <div className={`${styles.tickets_main_container}`}>
                        <div
                            className={`${styles.tickets_container} flex-container`}
                        >
                            <TicketForm
                                id={currentMovie[0]?.id}
                                poster={currentMovie[0]?.poster}
                                title={currentMovie[0]?.title}
                                price={currentMovie[0]?.price}
                                session_time={currentMovie[0]?.session_time}
                                start_date={currentMovie[0]?.start_date}
                                end_date={currentMovie[0]?.end_date}
                            />
                        </div>
                    </div>
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
