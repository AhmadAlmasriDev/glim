import React from "react";
import TicketDate from "./TicketDate";
import styles from "./styles/TicketForm.module.css";

const TicketCalendar = ({ period, on_change_function }) => {
    return (
        <div>
            <h3 className={`${styles.month}`}>{period.month}</h3>
            <ul className={`${styles.time_list}`}>
                {period.days.map((day, idx) => (
                    <TicketDate
                        key={idx}
                        month={period.month}
                        day={day}
                        on_change_function={on_change_function}
                    />
                ))}
            </ul>
        </div>
    );
};

export default TicketCalendar;
