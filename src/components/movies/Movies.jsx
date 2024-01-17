import React,{useContext, useEffect, useState} from "react"
import styles from "./styles/Movies.module.css"
import DataContext from "../../context/DataContext";
import MoviePoster from "../movie_poster/MoviePoster"
import { axiosReq } from "../../api/axiosDefaults";
import Moment from "moment";
import {Link} from "react-router-dom"
import MoviesButtons from "./MoviesButtons"
import Asset from "../asset/Asset";

const Movies = () => {
    const [hasLoaded, setHasLoaded] = useState(false)
    const [movies, setMovies] = useState ([])
    const {currentUser}= useContext(DataContext)
    const currentDate = Moment()
    

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

    
    const main = (
        <div className={`${styles.movies_wrapper} wrapper flex-container`}>
            
            
            <div className={`${styles.movies_page_container} v-flex-container`}>
                <div className={`${styles.movies_page_title_container} flex-container`}>
                <h1 className={`${styles.movies_page_title}`}>Movies</h1>
                {movies[0]?.is_admin && <Link className={`${styles.movies_add_button} button`} to="movies/add-movie">Add +</Link>}
                </div>
                <section className={`${styles.movies_main_container} v-flex-container`}>
                    <h3 className={`${styles.section_title}`}>In theatres now</h3>
                    <div className={`${styles.movies_container} flex-container`}>
                        {movies?.map((movie, idx)=> 
                            Moment(movie?.end_date,"MM/DD/YYYY").isSameOrAfter(currentDate) &&
                            <div key={idx} className={`${styles.movie_item_container} v-flex-container`}> 
                                <Link to ={`/movies/${movie?.id}`} className={`${styles.movie_item} v-flex-container`}>
                                    <MoviePoster 
                                    key={idx}
                                    title={movie?.title} 
                                    shade = {true}
                                    poster={movie?.poster} 
                                    
                                    underTitle={false}/>
                                    <div className={`${styles.movie_item_title_container} v-flex-container`}>
                                        <h3 className={`${styles.movie_item_title}`}>{movie?.title} </h3>
                                    </div>
                                </Link>
                               {movie?.is_admin && <MoviesButtons id={movie?.id}/>}
                            </div>
                        )}    
                    </div>
                </section>
                <section className={`${styles.movies_main_container} v-flex-container`}>
                    <h3 className={`${styles.section_title}`}>Old entries</h3>
                    <div className={`${styles.movies_container} flex-container`}>
                        {movies?.map((movie, idx)=> 
                            Moment(movie?.end_date,"MM/DD/YYYY").isBefore(currentDate) &&
                            <div key={idx} className={`${styles.movie_item_container} v-flex-container`}> 
                                <Link to ={`/movies/${movie?.id}`} className={`${styles.movie_item} v-flex-container`}>
                                    <MoviePoster 
                                    key={idx}
                                    title={movie?.title} 
                                    shade = {true}
                                    poster={movie?.poster} 
                                    
                                    underTitle={false}/>
                                    <div className={`${styles.movie_item_title_container} v-flex-container`}>
                                        <h3 className={`${styles.movie_item_title}`}>{movie?.title} </h3>
                                    </div>
                                </Link>
                                {movie?.is_admin && <MoviesButtons id={movie?.id}/>}
                                
                            </div>
                        )}    
                    </div>
                </section>
            </div>
        </div>
    )
    return (
        <article className={`wrapper flex-container`}>
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
    )
}

export default Movies