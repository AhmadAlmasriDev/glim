import React from "react";
import styles from "./styles/FilmDate.module.css";

const TicketDate = ({ month, day, on_change_function }) => {
    return (
        <li className={`${styles.list_item}`}>
            <input
                className={`${styles.list_item_input}`}
                type="radio"
                id="day"
                name="day"
                data-month={month}
                value={day}
                onChange={on_change_function}
            />
            <label className={`${styles.list_item_label}`} htmlFor="day">
                {day}
            </label>
        </li>
    );
};

export default TicketDate;
