import React from "react";
import styles from "./styles/Seats.module.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const SeatItem = ({
    seat,
    price,
    reserve,
    purchased,
    is_owner,
    on_change_function,
    seatInfo,
}) => {
    const seatdetails = seatInfo(seat, price);
    const grayed = (
        <div className={`${styles.seat_item}`}>
            <div className={`${styles.seat_item_label}`}>
                <i className={`${styles.seat_icon_gray} fa-solid fa-couch`}></i>
            </div>
        </div>
    );
    /*
    Check if the seat is reserved purchased or not
    */
    const seat_check = (checked) => (
        <div className={`${styles.seat_item}`}>
            <OverlayTrigger
                placement="top"
                overlay={
                    <Tooltip>
                        {
                            <>
                                {`${seatdetails.row} Row, ${seatdetails.number} Seat`}
                                <br />
                                {`Price: ${seatdetails.price}€`}
                            </>
                        }
                    </Tooltip>
                }
            >
                <input
                    className={`${styles.seat_item_input} `}
                    type="checkbox"
                    id={seat}
                    name="seat"
                    value={seat}
                    onChange={on_change_function}
                />
            </OverlayTrigger>
            <label className={`${styles.seat_item_label}`} htmlFor={seat}>
                <i
                    className={`fa-solid fa-couch ${
                        checked ? styles.seat_icon_red : styles.seat_icon_white
                    }`}
                ></i>
            </label>
        </div>
    );
    /*
    return the seats color and functionality dipending on there state
    */
    const seatlogic = () => {
        if (purchased) {
            return grayed;
        } else if (reserve) {
            if (is_owner) {
                return seat_check(true);
            } else {
                return grayed;
            }
        } else {
            return seat_check(false);
        }
    };

    return (
        <li className={`${styles.seat_item_container}  flex-container`}>
            {seatlogic()}
        </li>
    );
};

export default SeatItem;
