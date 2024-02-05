import React from "react";
import { seatInfo } from "../../utils/utils";
import styles from "./styles/Profile.module.css";
import MoviePoster from "../movie_poster/MoviePoster";
import Moment from "moment";
import { Link } from "react-router-dom";

const ProfileTicket = ({ currentMovie, seat, date }) => {
    const currentSeat = seatInfo(seat, currentMovie?.price);

    return (
        <div className={`${styles.ticket_container} flex-container`}>
            <Link to ={`/movies/${currentMovie?.id}`} className={`${styles.poster_container}`}>
                <MoviePoster poster={currentMovie?.poster} width={100} />
            </Link>
            <div className={`${styles.info_container} flex-container`}>
                <div
                    className={`${styles.left_info_container} v-flex-container`}
                >
                    <h3 className={`${styles.info_film}`}>
                        {currentMovie?.title}
                    </h3>
                    <p>{Moment(date, "MM/DD/YYYY").format("DD MMM YYYY")}</p>
                    <p>
                        {Moment(currentMovie?.session_time, "HH:mm:ss").format(
                            "HH:mm"
                        )}
                    </p>
                </div>
                <div
                    className={`${styles.right_info_container} v-flex-container`}
                >
                    <div
                        className={`${styles.ticket_seat_info} v-flex-container`}
                    >
                        <p>
                            {currentSeat.type}
                            <span
                                className={`${styles.info_price}`}
                            >{`${currentSeat.price} €`}</span>
                        </p>
                        <p>{`Row: ${currentSeat.row}`}</p>
                        <p>{`Seat: ${currentSeat.number}`}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileTicket;
