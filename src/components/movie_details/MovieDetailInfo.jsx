import React from "react";
import styles from "./styles/MovieDetail.module.css";
import MovieDetailInfoItem from "./MovieDetailInfoItem";

const MovieDetailInfo = ({
    all_ratings,
    rated,
    year,
    director,
    distribution,
    actors,
    genre,
    start_date,
    end_date,
    discreption,
}) => {
    return (
        <div>
            <ul className={`${styles.info_container}`}>
                <MovieDetailInfoItem
                    itemName={"Rated"}
                    itemValue={all_ratings[rated]}
                />
                <MovieDetailInfoItem itemName={"Year"} itemValue={year} />
                <MovieDetailInfoItem
                    itemName={"Director"}
                    itemValue={director}
                />
                <MovieDetailInfoItem
                    itemName={"Distribution"}
                    itemValue={distribution}
                />
                <MovieDetailInfoItem itemName={"Actors"} itemValue={actors} />
                <MovieDetailInfoItem itemName={"Genre"} itemValue={genre} />
                <MovieDetailInfoItem
                    itemName={"Show period"}
                    itemValue={`${start_date} - ${end_date}`}
                />
            </ul>
            <div>
                <p className={`${styles.movie_discreption}`}>{discreption}</p>
            </div>
        </div>
    );
};

export default MovieDetailInfo;
