import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import DataContext from "../../context/DataContext";
import Seats from "../seats/Seats";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import Moment from "moment";
import MoviePoster from "../movie_poster/MoviePoster";
import styles from "./styles/Tickets.module.css";
import CloseButton from "../CloseButton/CloseButton";
import TicketsOrder from "./TicketsOrder";

const Tickets = () => {
    const SEATS = 84;
    const history = useHistory();
    const [hasLoaded, setHasLoaded] = useState(false);
    const [seatToggle, setSeatToggle] = useState(false);
    const [seatsPH, setSeatsPH] = useState([]);
    const [sum, setSum] = useState("00");
    const { currentBook } = useContext(DataContext);
    const currentShowDate = Moment(
        `${currentBook?.month}/${currentBook?.day}/${currentBook?.year}`,
        "MMMM/DD/YYYY"
    ).format("MM/DD/YYYY");
    const currentDay = Moment(
        `${currentBook?.month}/${currentBook?.day}/${currentBook?.year}`,
        "MMMM/DD/YYYY"
    ).format("dddd");

    // const [currentTickets, setCurrentTickets] = useState({
    //     movie: currentBook?.id,
    //     title: currentBook?.title,
    //     show_time: currentBook?.show_time,
    //     price: currentBook?.price,
    //     tickets: [],
    // });

    const deleteTicket = async (seat, ticketId) => {
        try {
            await axiosRes.delete(`/tickets/${ticketId}`);
            setSeatToggle((prevSeatToggle) => !prevSeatToggle);
            // resetTickets(seat);
        } catch (err) {
            console.log(err);
        }
    };

    // const resetTickets = async (seat, ticketId) => {
    //     console.log("resettickets id: " + ticketId);
    //     setCurrentTickets((prevCurrentTickets) => ({
    //         ...prevCurrentTickets,
    //         tickets: prevCurrentTickets.tickets.filter(
    //             (ticket) => ticket.seat === parseInt(seat)
    //         ).length
    //             ? [
    //                   ...prevCurrentTickets.tickets.filter(
    //                       (ticket) => ticket.seat != seat
    //                   ),
    //               ]
    //             : [
    //                   ...prevCurrentTickets.tickets,
    //                   {
    //                       ticketId: ticketId,
    //                       seat: parseInt(seat),
    //                       reserve: true,
    //                       purchased: false,
    //                   },
    //               ],
    //     }));
    // };

    const setPH = async () => {
        let seats_obj = [];
        const data = await fetchTickets();
        orderSum(data);
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
        console.log(seats_obj);
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

    const orderSum = (data) => {
        const sum = data?.length
            ? data?.reduce(
                  (acc, cv) =>
                      acc + seatInfo(cv?.seat, currentBook?.price).price,
                  0
              )
            : "00";
        // const sum = seatsPH?.filter((item) => item.id).length
        //     ? seatsPH
        //           ?.filter((item) => item.id)
        //           .reduce(
        //               (acc, cv) =>
        //                   acc + seatInfo(cv?.seat, currentBook?.price).price,
        //               0
        //           )
        //     : 10000;

        setSum(sum);
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
                                <h4 className={`${styles.movie_info_title}`}>
                                    {currentBook?.title}
                                </h4>

                                <h5 className={`${styles.movie_info_date}`}>
                                    <span>{currentDay}</span>
                                    <span>{currentShowDate}</span>
                                </h5>
                                <h5 className={`${styles.movie_info_time}`}>
                                    {currentBook?.show_time}
                                </h5>
                            </div>
                        </div>
                        <Seats
                            // resetTickets={resetTickets}
                            deleteTicket={deleteTicket}
                            seatInfo={seatInfo}
                            setSeatToggle={setSeatToggle}
                            fetchTickets={fetchTickets}
                            currentShowDate={currentShowDate}
                            seatsPH={seatsPH}
                            // currentTickets={currentTickets}
                            // setCurrentTickets={setCurrentTickets}
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
                                    {/* <span>{hasLoaded ? orderSum() : sum}</span> */}
                                    <span>{sum}</span>
                                </div>
                            </div>
                            {seatsPH.filter((item) => item.id).length ? (
                                seatsPH
                                    .filter((item) => item.id)
                                    .map((ticket) => (
                                        <TicketsOrder
                                            key={ticket?.id}
                                            seat={ticket?.seat}
                                            currentBook={currentBook}
                                            seatInfo={seatInfo}
                                            ticketId={ticket?.id}
                                            deleteTicket={deleteTicket}
                                        />
                                    ))
                            ) : (
                                <></>
                            )}
                            {/* {console.log(currentTickets)} */}
                            <div
                                className={`${styles.payment_container} v-flex-container`}
                            >
                                <div
                                    className={`${styles.payment_ruler} `}
                                ></div>

                                <button className={`button`}>Purchase</button>
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
