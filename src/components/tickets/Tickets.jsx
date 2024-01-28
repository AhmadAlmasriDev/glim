import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import DataContext from "../../context/DataContext";
import Seats from "../seats/Seats";
import { axiosReq } from "../../api/axiosDefaults";
import Moment from "moment";

const Tickets = () => {
    const SEATS = 84;
    const history = useHistory();
    const [hasLoaded, setHasLoaded] = useState(false);
    const [seatToggle, setSeatToggle] = useState(false);
    // const [currentSeat, setCurrentSeat] = useState(null);
    const [seatsPH, setSeatsPH] = useState([]);
    const { currentBook, currentUser } = useContext(DataContext);
    const currentShowDate = Moment(
        `${currentBook?.month}/${currentBook?.day}/${currentBook?.year}`,
        "MMMM/DD/YYYY"
    ).format("MM/DD/YYYY");

    const [currentTickets, setCurrentTickets] = useState({
        movie: currentBook?.id,
        title: currentBook?.title,
        show_time: currentBook?.show_time,
        price: currentBook?.price,
        tickets: [],
    });

    const setPH = async () => {
        let seats_obj = [];
        const data = await fetchTickets();

        for (let i = 1; i <= SEATS; i++) {
            if (data?.length) {
                const ticket = data?.filter((item) => item?.seat === i);

                if (ticket.length) {
                    seats_obj.push({
                        id: ticket[0]?.id,
                        seat: i,
                        purchased: ticket[0]?.purchased,
                        reserve: ticket[0]?.reserve,
                        is_owner: ticket[0]?.is_owner,
                    });
                } else
                    seats_obj.push({
                        seat: i,
                        purchased: false,
                        reserve: false,
                        is_owner: null,
                    });
            } else {
                seats_obj.push({
                    seat: i,
                    purchased: false,
                    reserve: false,
                    is_owner: null,
                });
            }
        }
        setSeatsPH(seats_obj);
        setHasLoaded(true);
    };

    const fetchTickets = async () => {
        try {
            const { data } = await axiosReq.get(
                `/tickets/?movie=${currentBook?.id}&show_date=${currentShowDate}`
            );

            // setTickets(data);
            // setPH(data);

            // setHasLoaded(true);
            return data;
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        setHasLoaded(false);

        setPH();
        return () => setSeatsPH([]);
    }, [seatToggle]);

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
            {/* {console.log(currentTickets)}
            {console.log(currentBook)}
            <div>
                <div>
                    <Seats
                        seatInfo={seatInfo}
                        setSeatToggle={setSeatToggle}
                        fetchTickets={fetchTickets}
                        currentShowDate={currentShowDate}
                        seatsPH={seatsPH}
                        currentTickets={currentTickets}
                        setCurrentTickets={setCurrentTickets}
                        hasLoaded={hasLoaded}
                    />
                </div>
            </div> */}

            {/* IMPORTANT DONT DELETE!!!! */}

            {currentBook?.day ? (
                <div>
                    <Seats
                        seatInfo={seatInfo}
                        setSeatToggle={setSeatToggle}
                        fetchTickets={fetchTickets}
                        currentShowDate={currentShowDate}
                        seatsPH={seatsPH}
                        currentTickets={currentTickets}
                        setCurrentTickets={setCurrentTickets}
                        hasLoaded={hasLoaded}
                    />
                </div>
            ) : (
                history.push("/")
            )}
        </div>
    );
};

export default Tickets;
