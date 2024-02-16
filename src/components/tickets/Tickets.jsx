import React, { useContext, useState, useEffect } from "react";
import { useHistory, NavLink } from "react-router-dom";
import DataContext from "../../context/DataContext";
import Seats from "../seats/Seats";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import Moment from "moment";
import MoviePoster from "../movie_poster/MoviePoster";
import styles from "./styles/Tickets.module.css";
import CloseButton from "../CloseButton/CloseButton";
import TicketsOrder from "./TicketsOrder";
import { seatInfo } from "../../utils/utils";
import useLocalStorage from "../../hooks/useLocalStorage";

const Tickets = () => {
    const SEATS = 84;
    const history = useHistory();
    const [hasLoaded, setHasLoaded] = useState(false);
    const [seatToggle, setSeatToggle] = useState(false);
    const [seatsPH, setSeatsPH] = useState([]);
    const [sum, setSum] = useState(0);
    const [hasReserve, setHasReserve] = useState(false);
    const { currentUser } = useContext(DataContext);
    const [currentBook, setCurrentBook] = useLocalStorage("currentBook", {});
    const currentShowDate = Moment(
        `${currentBook?.month}/${currentBook?.day}/${currentBook?.year}`,
        "MMMM/DD/YYYY"
    ).format("MM/DD/YYYY");
    const currentDay = Moment(
        `${currentBook?.month}/${currentBook?.day}/${currentBook?.year}`,
        "MMMM/DD/YYYY"
    ).format("dddd");

    /*
    Delete expired tickets (reserved flag is true but 3 minutes passed)
    */

    useEffect(() => {
        const delItemRefresh = async () => {
            const data = await fetchTickets();
            data?.filter((seat) => !seat?.purchased && seat?.expired).map(
                (item) => deleteTicket(item?.id)
            );
        };
        delItemRefresh();
    }, []);

    /*
    Delete tickets by id
    */
    const deleteTicket = async (ticketId) => {
        try {
            await axiosRes.delete(`/tickets/${ticketId}`);
            setSeatToggle((prevSeatToggle) => !prevSeatToggle);
        } catch (err) {
            console.log(err);
        }
    };
    /*
    Generate seats place holders from tickets
    */
    const generatePH = async () => {
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
        setHasLoaded(true);
    };
    /*
    Fetch tickets from API by movie and date
    */
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
    /*
    Initiate seats place holders generating and save it to state
    */
    useEffect(() => {
        setHasLoaded(false);

        generatePH();

        return () => {
            setSeatsPH([]);
        };
    }, [seatToggle]);
    /*
    Calculate the tickets price sum
    */
    const orderSum = (data) => {
        const sum = data?.length
            ? data
                  .filter((item) => !item.purchased && item.is_owner)
                  .reduce(
                      (acc, cv) =>
                          acc + seatInfo(cv?.seat, currentBook?.price).price,
                      0
                  )
            : 0;
        setSum(sum);
    };
    /*
    Close handle function
    */
    const handleClose = () => {
        history.push("/");
    };
    /*
    Update ticket purchased flag to true
    */
    const ticketPurchase = async (ticketId) => {
        try {
            await axiosReq.patch(`/tickets/${ticketId}`, { purchased: true });
        } catch (err) {
            console.log(err);
        }
    };
    /*
    Update ticket reserved flag to true and change setHasReserve to true
    */
    const handleReserve = () => {
        if (
            seatsPH.filter((item) => !item?.purchased && item?.is_owner).length
        ) {
            seatsPH
                ?.filter((item) => !item?.purchased && item?.is_owner)
                .map((ticket) => ticketPurchase(ticket.id));
            setHasReserve(true);
        }
    };

    return (
        <article className={`${styles.article_wrapper} flex-container wrapper`}>
            {currentBook?.day ? (
                hasReserve ? (
                    <div>
                        <div
                            className={`${styles.reserve_main_container} v-flex-container`}
                        >
                            <div
                                className={`${styles.reserve_close_button_container} flex-container`}
                            >
                                <CloseButton on_click_function={handleClose} />
                            </div>
                            <div className={`${styles.reserve_container}`}>
                                <h3>You have successfuly made a reservation</h3>
                                <p>
                                    The tickets can be payed on the cinema's box
                                    office
                                </p>
                                <NavLink
                                    to={`/profiles/${currentUser?.profile_id}`}
                                    className={`button`}
                                >
                                    Check Tickets
                                </NavLink>
                            </div>
                        </div>
                    </div>
                ) : (
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
                                    <h4
                                        className={`${styles.movie_info_title}`}
                                    >
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
                            {
                                <Seats
                                    deleteTicket={deleteTicket}
                                    seatInfo={seatInfo}
                                    setSeatToggle={setSeatToggle}
                                    fetchTickets={fetchTickets}
                                    currentShowDate={currentShowDate}
                                    seatsPH={seatsPH}
                                    hasLoaded={hasLoaded}
                                />
                            }
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
                                        <span>{sum}</span>
                                    </div>
                                </div>
                                <div
                                    className={`${styles.order_ticket_container} v-flex-container`}
                                >
                                    {seatsPH.filter((item) => item?.id)
                                        .length ? (
                                        seatsPH
                                            ?.filter(
                                                (item) =>
                                                    !item?.purchased &&
                                                    item?.is_owner
                                            )
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
                                </div>
                                <div
                                    className={`${styles.payment_container} v-flex-container`}
                                >
                                    <div
                                        className={`${styles.payment_ruler} `}
                                    ></div>

                                    <button
                                        className={`button`}
                                        onClick={handleReserve}
                                    >
                                        Reserve
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>
                )
            ) : (
                history.push("/")
            )}
        </article>
    );
};

export default Tickets;
