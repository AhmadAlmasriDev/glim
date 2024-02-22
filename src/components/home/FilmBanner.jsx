import React, { useContext } from "react";
import styles from "./styles/FilmBanner.module.css";
import LikeCount from "../likes_comments_count/LikeCount";
import CommentCount from "../likes_comments_count/CommentCount";
import TrailerButton from "./TrailerButton";
import TicketForm from "./TicketForm";
import DataContext from "../../context/DataContext";
import { Link, useHistory } from "react-router-dom";

const FilmBanner = ({ movies, setMovies, currentMovie }) => {
    const { setMainPage, setShowTrailer } = useContext(DataContext);
    const history = useHistory();
    const handlTrailer = (id) => {
        setMainPage(true);
        setShowTrailer(true);
        history.push(`/movies/${id}`, { prevPath: "/" });
    };

    return (
        <div
            className={`${styles.film_background} flex-container`}
            style={{
                backgroundImage: ` linear-gradient(to bottom, rgba(0,0,0,0)50%, rgba(0,0,0,.9)90%, rgba(0,0,0,1)), url(${currentMovie?.poster})`,
            }}
        >
            <div className={`${styles.content_background} v-flex-container`}>
                <div className={`${styles.content_container}`}>
                    <div className={`v-flex-container`}>
                        <section className={`v-flex-container`}>
                            <div className={`flex-container`}>
                                <LikeCount
                                    movies={movies}
                                    movie={currentMovie}
                                    setMovie={setMovies}
                                />
                                <CommentCount
                                    id={currentMovie?.id}
                                    comments_count={
                                        currentMovie?.comments_count
                                    }
                                />
                            </div>
                            <TrailerButton
                                id={currentMovie?.id}
                                type={75}
                                on_click_function={handlTrailer}
                            />
                        </section>
                        <section
                            className={`${styles.form_section} flex-container`}
                        >
                            <TicketForm
                                id={currentMovie?.id}
                                poster={currentMovie?.poster}
                                title={currentMovie?.title}
                                price={currentMovie?.price}
                                session_time={currentMovie?.session_time}
                                start_date={currentMovie?.start_date}
                                end_date={currentMovie?.end_date}
                            />
                        </section>
                    </div>
                </div>
                <div className={`${styles.film_title} flex-container`}>
                    <Link to={`/movies/${currentMovie?.id}`}>
                        {currentMovie?.title}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FilmBanner;
