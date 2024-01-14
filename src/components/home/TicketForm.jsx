import React, { useContext, useState } from "react";
import styles from "./styles/TicketForm.module.css";
import Moment from "moment";
import { Link, useHistory } from "react-router-dom";

import { Tooltip, OverlayTrigger } from "react-bootstrap";

import DataContext from "../../context/DataContext";
import TicketCalendar from "./TicketCalendar";

const TicketForm = ({ title, price, start_date, end_date, session_time }) => {
    const time = Moment(session_time, "HH:mm:ss").format("HH:mm");
    const year = Moment(start_date, "MM/DD/YYYY").format("YYYY");
    const { currentUser, currentTicket, setCurrentTicket } =
        useContext(DataContext);
    const [ticketData, setTicketData] = useState({
        title: title,
        time: time,
        year: year,
        price: price,
        day: "",
        month: "",
    });

    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        setCurrentTicket({ ...ticketData });

        history.push("/tickets");
    };

    const handleChange = (event) => {
        setTicketData({
            ...ticketData,
            [event.target.name]: event.target.value,
            month: event.target.dataset.month,
        });
    };

    const days = (start, end) => {
        const startD = Moment(start, "MM/DD/YYYY");
        const endD = Moment(end, "MM/DD/YYYY");
        const startD_month = Moment(start, "MM/DD/YYYY").format("MMMM");
        const endD_month = Moment(end, "MM/DD/YYYY").format("MMMM");

        if (startD_month === endD_month) {
            const date = [];
            for (
                let m = Moment(startD);
                m.isSameOrBefore(endD);
                m.add(1, "days")
            ) {
                date.push(m.format("DD"));
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
                if (m.format("MMMM") === startD_month) {
                    date1.push(m.format("DD"));
                } else {
                    date2.push(m.format("DD"));
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
            <div className={`${styles.button_container} flex-container`}>
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
                        overlay={<Tooltip>Sign in to Buy a ticket!</Tooltip>}
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
            {days(start_date, end_date).map((period, idx) => (
                <TicketCalendar
                    key={idx}
                    period={period}
                    on_change_function={handleChange}
                />
            ))}
        </form>
    );
};

export default TicketForm;
