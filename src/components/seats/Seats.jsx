import React, { useEffect, useState, useRef } from "react";
import styles from "./styles/Seats.module.css";
import Asset from "../asset/Asset";
import SeatItem from "./SeatItem";
import Moment from "moment";
import useLocalStorage from "../../hooks/useLocalStorage";
import { axiosRes } from "../../api/axiosDefaults";

const Seats = ({
    seatsPH,
    hasLoaded,
    setSeatToggle,
    seatInfo,
    currentShowDate,
    deleteTicket,
}) => {
    const [currentBook, setCurrentBook] = useLocalStorage("currentBook", {});
    const [toDelTicketId, setToDelTicketId] = useState(null);
    const timerRef = useRef();

    /*
    Delete reserved ticket after interval
    */
    useEffect(() => {
        const timer = () => {
            setTimeout(() => {
                deleteTicket(toDelTicketId);
            }, 2 * 60 * 1000); // This will delete the ticket after 2 min

            return () => {
                clearTimeout(timerRef.current);
            };
        };
        toDelTicketId && timer();
    }, [toDelTicketId]);

    /*
    Create a ticket with reserve true flag
    */
    const createTicket = async (obj) => {
        try {
            const { data } = await axiosRes.post("/tickets/", obj);
            setSeatToggle((prevSeatToggle) => !prevSeatToggle);
            setToDelTicketId(data.id);
        } catch (err) {
            console.log(err);
        }
    };

    /*
    Check the selected seat if reserved  by other user or purchased
    */
    const checkSeat = (event) => {
        const currentSeat = seatsPH[event.target.value - 1];
        const currentTicketId = seatsPH[event.target.value - 1]?.id;

        if (!currentSeat.purchased & !currentSeat.reserve) {
            const postObj = {
                movie: currentBook?.id,
                seat: event.target.value,
                reserve: true,
                show_date: Moment(currentShowDate, "MM/DD/YYYY").format(
                    "YYYY-MM-DD"
                ),
            };
            createTicket(postObj);
        } else if (currentSeat.reserve & currentSeat.is_owner)
            deleteTicket(currentTicketId);
    };
    /*
    Change handle function
    */
    const handleChange = (event) => {

        try {
            checkSeat(event);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className={`${styles.seats_main_container} v-flex-container`}>
            <div className={`${styles.seats_header_container} flex-container`}>
                <h3 className={`${styles.seats_header}`}>Available seats</h3>
            </div>
            <div className={`v-flex-container`}>
                <hr className={`${styles.seats_screen}`} />
                <h4 className={`${styles.seats_screen_text}`}>screen</h4>
            </div>
            <form className={`v-flex-container`}>
                {hasLoaded ? (
                    <ul className={`${styles.seats_container}`}>
                        {seatsPH?.map((seatPH) => (
                            <SeatItem
                                key={seatPH?.seat}
                                price={currentBook?.price}
                                seatInfo={seatInfo}
                                purchased={seatPH?.purchased}
                                seat={seatPH?.seat}
                                reserve={seatPH?.reserve}
                                is_owner={seatPH?.is_owner}
                                on_change_function={handleChange}
                            />
                        ))}
                    </ul>
                ) : (
                    <div
                        className={`${styles.spinner_container} flex-container`}
                    >
                        <Asset spinner />
                    </div>
                )}
            </form>
        </div>
    );
};

export default Seats;
