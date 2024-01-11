import React from "react";
import TicketDate from "./TicketDate";
import styles from "./styles/TicketForm.module.css";

const TicketCalendar = ({ period }) => {
    return (
        <div>
            <h3 className={`${styles.month}`}>{period.month}</h3>
            <ul className={`${styles.time_list}`}>
                {period.days.map((day) => (
                    <TicketDate day={day} />
                ))}
            </ul>
        </div>
    );
};

export default TicketCalendar;
