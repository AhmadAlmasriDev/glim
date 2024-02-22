import React, { useContext, useEffect, useState } from "react";
import styles from "./styles/TicketForm.module.css";
import Moment from "moment";
import { Link, useHistory } from "react-router-dom";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import DataContext from "../../context/DataContext";
import TicketCalendar from "./TicketCalendar";
import useLocalStorage from "../../hooks/useLocalStorage";

const TicketForm = ({
    id,
    poster,
    title,
    price,
    start_date,
    end_date,
    session_time,
}) => {
    const time = Moment(session_time, "HH:mm:ss").format("HH:mm");
    const year = Moment(start_date, "MM/DD/YYYY").format("YYYY");
    const { currentUser } = useContext(DataContext);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [currentBook, setCurrentBook] = useLocalStorage("currentBook", {});
    const [ticketData, setTicketData] = useState({
        id: id,
        poster: poster,
        title: title,
        show_time: time,
        year: year,
        price: price,
        day: "",
        month: "",
    });
    const history = useHistory();

    /* 
    Handle submit function
    */
    const handleSubmit = (event) => {
        event.preventDefault();
        if (ticketData?.day) {
            const period = days(start_date, end_date);
            setCurrentBook({ ...ticketData, period });
            setHasSubmitted(true);
        }
    };

    /* 
    Redirect to tickets page when submitted
    */
    useEffect(() => {
        hasSubmitted && history.push("/tickets");
    }, [hasSubmitted]);

    /* 
    Handle change function
    */
    const handleChange = (event) => {
        setTicketData({
            ...ticketData,
            [event.target.name]: event.target.value,
            month: event.target.dataset.month,
        });
    };

    /* 
    Calculate the show dates and period
    */
    const days = (start, end) => {
        const startD = Moment(start, "MM/DD/YYYY");
        const endD = Moment(end, "MM/DD/YYYY");
        const startD_month = Moment(start, "MM/DD/YYYY").format("MMMM");
        const endD_month = Moment(end, "MM/DD/YYYY").format("MMMM");
        const momentObj = Moment().format("MM/DD/YYYY");
        const currentDate = Moment(momentObj, "MM/DD/YYYY");
        const currentmonth = currentDate.format("MMMM");

        if (currentDate.isAfter(Moment(endD))) {
            return false;
        } else if (startD_month === endD_month) {
            const date = [];
            for (
                let m = Moment(startD);
                m.isSameOrBefore(endD);
                m.add(1, "days")
            ) {
                m.isSameOrAfter(currentDate) && date.push(m.format("DD"));
            }
            return [
                {
                    month: startD_month,
                    days: date,
                },
            ];
        } else {
            const date1 = [];
            const date2 = [];
            for (
                let m = Moment(startD);
                m.isSameOrBefore(endD);
                m.add(1, "days")
            ) {
                if (
                    (m.format("MMMM") === startD_month) &
                    m.isSameOrAfter(currentDate)
                ) {
                    date1.push(m.format("DD"));
                } else {
                    m.isSameOrAfter(currentDate) && date2.push(m.format("DD"));
                }
            }
            return [
                {
                    month: startD_month,
                    days: date1,
                },
                {
                    month: endD_month,
                    days: date2,
                },
            ];
        }
    };

    return (
        <form className={`${styles.main_container}`}>
            {days(start_date, end_date) ? (
                <>
                    <div
                        className={`${styles.button_container} flex-container`}
                    >
                        <h3 className={`${styles.time_label}`}>{time}</h3>
                        {currentUser ? (
                            <button
                                className={`${styles.buy_button} button`}
                                onClick={handleSubmit}
                            >
                                Buy a ticket
                            </button>
                        ) : (
                            <OverlayTrigger
                                placement="top"
                                overlay={
                                    <Tooltip>Sign in to Buy a ticket!</Tooltip>
                                }
                            >
                                <Link
                                    className={`${styles.buy_button} button`}
                                    to="/signin"
                                >
                                    Buy a ticket
                                </Link>
                            </OverlayTrigger>
                        )}
                    </div>
                    {days(start_date, end_date).map(
                        (period, idx) =>
                            period?.month && (
                                <TicketCalendar
                                    key={idx}
                                    title={title}
                                    period={period}
                                    on_change_function={handleChange}
                                />
                            )
                    )}
                </>
            ) : (
                <div className={`flex-container`}>
                    <h3 className={`${styles.not_in_message}`}>
                        This movie is not currently in theatres
                    </h3>
                </div>
            )}
        </form>
    );
};

export default TicketForm;
