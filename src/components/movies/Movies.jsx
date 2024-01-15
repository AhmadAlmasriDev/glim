import React,{useContext, useEffect, useState} from "react"
import styles from "./styles/Movies.module.css"
import DataContext from "../../context/DataContext";
import MoviePoster from "../movie_poster/MoviePoster"
import { axiosReq } from "../../api/axiosDefaults";
import Moment from "moment";
import {Link} from "react-router-dom"
import MoviesButtons from "./MoviesButtons"

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

    const checkDate = (date)=>{
        const endDate = Moment(date,"MM/DD/YYYY")
        console.log(endDate)
        console.log(currentDate)
        
        return endDate.isSameOrBefore(currentDate)

    }

    return (
        <article className={`${styles.movies_wrapper} wrapper flex-container`}>
            <div className={`${styles.movies_page_container} v-flex-container`}>

                <div className={`${styles.movies_page_title_container} flex-container`}>
                <h1 className={`${styles.movies_page_title}`}>Movies</h1>
                <Link className={`${styles.movies_add_button} button`} to="movies/add-movie">Add +</Link>
                </div>
                <section className={`${styles.movies_main_container} v-flex-container`}>
                    <h3 className={`${styles.section_title}`}>In theatres now</h3>
                    <div className={`${styles.movies_container} flex-container`}>
                        {movies?.map((movie, idx)=> 
                            Moment(movie?.end_date,"MM/DD/YYYY").isSameOrBefore(currentDate) &&
                                
                            
                                <div key={idx} className={`${styles.movie_item_container} v-flex-container`}> 
                                    <Link to ={`/movies/${movie?.id}`} className={`v-flex-container`}>
                                        <MoviePoster 
                                        key={idx}
                                        title={movie?.title} 
                                        shade = {true}
                                        poster={movie?.poster} 
                                        width={235} 
                                        underTitle={false}/>
                                        <h3 className={`${styles.movie_item_title}`}>{movie?.title} </h3>
                                    </Link>
                                    <MoviesButtons edit_link={null} delete_link={null}/>
                                    
                                </div>

                        )}    
                    </div>
                        
                    </section>
                    
            </div>

                    
               
           
            
        </article>
    )
}

export default Movies