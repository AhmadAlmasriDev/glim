import React, { useContext } from "react";
import DataContext from "../../context/DataContext";

const Tickets = () => {
    const { currentTicket } = useContext(DataContext);

    const seatInfo = (currentSeat, currentPrice) => {
        const rows = ["A", "B", "C", "D", "E", "F", "G"];
        const seat_per_row = 12;
        let row = rows[-Math.floor(currentSeat / -seat_per_row) - 1];
        let number =
            currentSeat -
            seat_per_row * (-Math.floor(currentSeat / -seat_per_row) - 1);
        let type = "Standard";
        if (row === "G") {
            let type = "Plus";
            currentPrice += 10;
        }
        return {
            row: row,
            number: number,
            type: type,
            price: currentPrice,
        };
    };

    return (
        <div>
            <p>test</p>
            <p>test2 {currentTicket?.title}</p>
        </div>
    );
};

export default Tickets;
