import React from "react";
import styles from "./styles/TicketForm.module.css";
import Moment from "moment";
import TicketCalendar from "./TicketCalendar";

const TicketForm = ({ start_date, end_date, session_time }) => {
    const time = Moment(session_time, "HH:mm:ss").format("HH:mm");

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
                <button className={`${styles.buy_button} button`} type="submit">
                    Buy a ticket
                </button>
            </div>
            {days(start_date, end_date).map((period) => (
                <TicketCalendar period={period} />
            ))}
        </form>
    );
};

export default TicketForm;
