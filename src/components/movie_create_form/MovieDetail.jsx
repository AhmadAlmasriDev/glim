import styles from "./styles/MovieDetail.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

import React, { useEffect, useState } from "react";
import MoviePoster from "./MoviePoster";

const MovieDetail = () => {
    const { id } = useParams();
    const [currentMovie, setCurrentMovie] = useState({});

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: movie }] = await Promise.all([
                    axiosReq.get(`/movies/${id}`),
                ]);
                setCurrentMovie(movie);
                // console.log(movie);
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
        <article>
            <div className={`${styles.main_container} flex-container`}>
                <section>
                    {/* <div className={`image-container`}>
                        <img src={poster} alt={`${title} movie poster`} />
                    </div> */}
                    <MoviePoster
                        title={title}
                        poster={poster}
                        width={150}
                        buttonType={100}
                    />
                </section>
                {/* The right side container used later to reverse the flex container */}
                <div className={`${styles.right_container} flex-container`}>
                    {/* info section */}
                    <section>
                        <div>
                            <h1>{title}</h1>
                            <ul className={`${styles.info_container}`}>
                                <li
                                    className={`${styles.info_item} flex-container`}
                                >
                                    <div className={`${styles.info_name}`}>
                                        rated:
                                    </div>
                                    <div className={`${styles.info_value}`}>
                                        {rated}
                                    </div>
                                </li>
                            </ul>
                            <div></div>
                        </div>
                    </section>
                    {/* seats section */}
                    <section>
                        <div>seat section</div>
                    </section>
                </div>
            </div>
        </article>
    );
};

export default MovieDetail;
