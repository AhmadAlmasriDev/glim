import React from "react";
import styles from "./styles/Tickets.module.css";
import CloseButton from "../CloseButton/CloseButton";

const TicketsOrder = ({
    seat,
    currentBook,
    seatInfo,
    ticketId,
    deleteTicket,
}) => {
    const { price, type, row, number } = seatInfo(seat, currentBook.price);
    return (
        <div className={`${styles.order_ticket} flex-container`}>
            <div className={`${styles.ticket_seat_container} v-flex-container`}>
                <div className={`${styles.order_ticket_type}`}>{type}</div>
                <div className={`${styles.order_ticket_seat}`}>
                    <span>{row} row</span>
                    <span>{number} seat</span>
                </div>
            </div>
            <div className={`${styles.order_ticket_price} flex-container`}>
                {price}€
            </div>
            <div className={`${styles.close_button_container} `}>
                <CloseButton on_click_function={() => deleteTicket(ticketId)} />
            </div>
        </div>
    );
};

export default TicketsOrder;
