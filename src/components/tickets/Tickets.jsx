import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import DataContext from "../../context/DataContext";
import Seats from "../seats/Seats";
import { axiosReq } from "../../api/axiosDefaults";
import Moment from "moment";
import MoviePoster from "../movie_poster/MoviePoster";
import styles from "./styles/Tickets.module.css";
import CloseButton from "../CloseButton/CloseButton";

const Tickets = () => {
    const SEATS = 84;
    const history = useHistory();
    const [hasLoaded, setHasLoaded] = useState(false);
    const [seatToggle, setSeatToggle] = useState(false);
    const [seatsPH, setSeatsPH] = useState([]);
    const { currentBook, currentUser } = useContext(DataContext);
    const currentShowDate = Moment(
        `${currentBook?.month}/${currentBook?.day}/${currentBook?.year}`,
        "MMMM/DD/YYYY"
    ).format("MM/DD/YYYY");
    const currentDay = Moment(
        `${currentBook?.month}/${currentBook?.day}/${currentBook?.year}`,
        "MMMM/DD/YYYY"
    ).format("dddd");

    const [currentTickets, setCurrentTickets] = useState({
        movie: currentBook?.id,
        title: currentBook?.title,
        show_time: currentBook?.show_time,
        price: currentBook?.price,
        tickets: [],
    });

    const setPH = async () => {
        let seats_obj = [];
        const data = await fetchTickets();

        for (let i = 1; i <= SEATS; i++) {
            if (data?.length) {
                const ticket = data?.filter((item) => item?.seat === i);

                if (ticket.length) {
                    seats_obj.push({
                        id: ticket[0]?.id,
                        seat: i,
                        purchased: ticket[0]?.purchased,
                        reserve: ticket[0]?.reserve,
                        is_owner: ticket[0]?.is_owner,
                    });
                } else
                    seats_obj.push({
                        seat: i,
                        purchased: false,
                        reserve: false,
                        is_owner: null,
                    });
            } else {
                seats_obj.push({
                    seat: i,
                    purchased: false,
                    reserve: false,
                    is_owner: null,
                });
            }
        }
        setSeatsPH(seats_obj);
        setHasLoaded(true);
    };

    const fetchTickets = async () => {
        try {
            const { data } = await axiosReq.get(
                `/tickets/?movie=${currentBook?.id}&show_date=${currentShowDate}`
            );

            return data;
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        setHasLoaded(false);

        setPH();
        return () => setSeatsPH([]);
    }, [seatToggle]);

    const seatInfo = (currentSeat, currentPrice) => {
        const rows = ["A", "B", "C", "D", "E", "F", "G"];
        const seat_per_row = 12;
        let row = rows[-Math.floor(currentSeat / -seat_per_row) - 1];
        let number =
            currentSeat -
            seat_per_row * (-Math.floor(currentSeat / -seat_per_row) - 1);
        let type = "Standard";
        if (row === "G") {
            let type = "Plus";
            currentPrice += 10;
        }
        return {
            row: row,
            number: number,
            type: type,
            price: currentPrice,
        };
    };
    return (
        <article className={`flex-container wrapper`}>
            {currentBook?.day ? (
                <div
                    className={`${styles.content_main_container} flex-container`}
                >
                    <section
                        className={`${styles.seat_section} v-flex-container`}
                    >
                        <div
                            className={`${styles.tickets_movie_info_container} flex-container`}
                        >
                            <MoviePoster
                                title={currentBook?.title}
                                poster={currentBook?.poster}
                                width={150}
                                buttonType={0}
                            />
                            <div
                                className={`${styles.tickets_movie_info} v-flex-container`}
                            >
                                <h4>{currentBook?.title}</h4>

                                <h5>
                                    <span>{currentDay}</span>
                                    <span>{currentShowDate}</span>
                                </h5>
                                <h5>{currentBook?.show_time}</h5>
                            </div>
                        </div>
                        <Seats
                            seatInfo={seatInfo}
                            setSeatToggle={setSeatToggle}
                            fetchTickets={fetchTickets}
                            currentShowDate={currentShowDate}
                            seatsPH={seatsPH}
                            currentTickets={currentTickets}
                            setCurrentTickets={setCurrentTickets}
                            hasLoaded={hasLoaded}
                        />
                    </section>

                    <section
                        className={`${styles.tickets_section} flex-container`}
                    >
                        <div
                            className={`${styles.main_order_container} v-flex-container`}
                        >
                            <div
                                className={`${styles.main_order_container_header} flex-container`}
                            >
                                <h3
                                    className={`${styles.main_order_header_title}`}
                                >
                                    Tickets
                                </h3>
                                <div className={`${styles.main_order_sum}`}>
                                    <span>SUM:</span>
                                    <span>111$</span>
                                </div>
                            </div>
                            <div
                                className={`${styles.order_ticket_container} v-flex-container`}
                            >
                                <div
                                    className={`${styles.order_ticket} v-flex-container`}
                                >
                                    <div
                                        className={`${styles.order_ticket_top} flex-container`}
                                    >
                                        <div
                                            className={`${styles.order_ticket_date}`}
                                        >
                                            <span>{currentShowDate}</span>
                                            <span>
                                                {currentBook?.show_time}
                                            </span>
                                        </div>
                                        <div
                                            className={`${styles.close_button_container}`}
                                        >
                                            <CloseButton
                                                on_click_function={null}
                                            />
                                        </div>
                                    </div>

                                    <div
                                        className={`${styles.order_ticket_bottom} flex-container`}
                                    >
                                        <span>30$</span> <span>VIP</span>
                                        <span>0row 00seat</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            ) : (
                history.push("/")
            )}
        </article>
    );
};

export default Tickets;
