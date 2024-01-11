import React from "react";
import styles from "./styles/MovieDetail.module.css";
import MovieDetailInfoItem from "./MovieDetailInfoItem";

const MovieDetailInfo = ({
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
    const RATING = ["G", "PG", "PG-13", "NC-17", "R"];

    return (
        <div>
            <ul className={`${styles.info_container}`}>
                <MovieDetailInfoItem
                    itemName={"Rated"}
                    itemValue={RATING[rated]}
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
        // <div>
        //     <ul>
        //         {infoData?.map((item) => {
        //             switch (item[0]) {
        //                 case "Show period":
        //                     <MovieDetailInfoItem
        //                         itemName={"Show period"}
        //                         itemValue={`${item[1]} - ${item[2]}`}
        //                     />;
        //                     break;
        //                 case "discreption":
        //                     break;
        //                 default:
        //                     <MovieDetailInfoItem
        //                         itemName={item[0]}
        //                         itemValue={item[1]}
        //                     />;
        //             }
        //         })}
        //     </ul>
        //     <div>
        //         <p className={`${styles.movie_discreption}`}>
        //             {infoData.pop()[1]}
        //         </p>
        //     </div>
        // </div>
    );
};

export default MovieDetailInfo;
