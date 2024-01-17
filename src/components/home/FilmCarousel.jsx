import React, { useEffect, useState, useContext } from "react";
import styles from "./styles/FilmCarousel.module.css";
import FilmBanner from "./FilmBanner";
import Moment from "moment";
import DataContext from "../../context/DataContext";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../asset/Asset";


const FilmCarousel = () => {
    const [movies, setMovies] = useState([]);
    const [hasLoaded, setHasLoaded] = useState(false);
    const { currentUser} = useContext(DataContext);
    
    
    

    const checkDate = (date)=>{
        const momentObj = Moment().format("MM/DD/YYYY")
        const currentDate = Moment(momentObj,"MM/DD/YYYY")
        // const currentDate = Moment("01/24/2024","MM/DD/YYYY")
        const endD = Moment(date, "MM/DD/YYYY");
        console.log(endD)
        console.log(currentDate)
        console.log(Moment(endD).isSameOrAfter(currentDate))
        return Moment(endD).isSameOrAfter(currentDate)

    }

    useEffect(() => {
        const fetchmovies = async () => {
            try {
                const { data } = await axiosReq.get(`/movies`);
                setMovies(data);
                setHasLoaded(true);
            } catch (err) {
                console.log(err);
            }
            // try {
            //     const [{ data: movies }, { data: ratings }] = await Promise.all([
            //       axiosReq.get(`/movies`),
            //       axiosReq.get(`/movies/service`),
            //     ]);
            //     setMovies(movies);
            //     setRatings(ratings[0]?.service.ratings);
            //     setHasLoaded(true);
            //   } catch (err) {
            //     console.log(err);
            //   }
        };

        setHasLoaded(false);
        fetchmovies();
    }, [currentUser]);



    return (
        <article className={`${styles.main_container} flex-container`}>
           
            <div className={`${styles.carousel_container} flex-container`}>
                {hasLoaded ? (
                    <>
                        {movies.length ? (
                            movies.map((movie) =>
                                movie.status ? (
                                    
                                    checkDate(movie?.end_date) && <FilmBanner
                                        key={movie.id}
                                        movies={movies}
                                        setMovies={setMovies}
                                        currentMovie={movie}
                                    />
                                ) : null
                            )
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
