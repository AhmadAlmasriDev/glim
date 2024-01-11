import React, { useEffect, useState, useContext } from "react";
import styles from "./styles/FilmCarousel.module.css";
import FilmBanner from "./FilmBanner";

import DataContext from "../../context/DataContext";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../asset/Asset";
const FilmCarousel = () => {
    const [movies, setMovies] = useState([]);
    const [hasLoaded, setHasLoaded] = useState(false);
    const { currentUser } = useContext(DataContext);

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
    }, []);

    return (
        <article className={`${styles.main_container} flex-container`}>
            <div className={`${styles.carousel_container} flex-container`}>
                {hasLoaded ? (
                    <>
                        {movies.length ? (
                            movies.map((movie) => (
                                <FilmBanner
                                    key={movie.id}
                                    movies={movies}
                                    setMovies={setMovies}
                                    currentMovie={movie}
                                />
                            ))
                        ) : (
                            <div>
                                <Asset message={"test message"} />
                            </div>
                        )}
                    </>
                ) : (
                    <div className={`flex-container`}>
                        <Asset spinner />
                    </div>
                )}
            </div>
        </article>
    );
};

export default FilmCarousel;
