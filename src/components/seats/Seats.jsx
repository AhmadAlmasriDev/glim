import React, { useEffect, useState, useContext } from "react";
import styles from "./styles/Seats.module.css";
import Asset from "../asset/Asset";
import DataContext from "../../context/DataContext";
import SeatItem from "./SeatItem";
import Moment from "moment";

import { axiosReq, axiosRes } from "../../api/axiosDefaults";

const Seats = ({
    seatsPH,
    hasLoaded,
    setSeatToggle,
    fetchTickets,
    seatInfo,

    setCurrentTickets,
    currentShowDate,
}) => {
    const { currentBook } = useContext(DataContext);

    useEffect(() => {
        const initalizeTickets = async () => {
            const data = await fetchTickets();
            const iTickets = data.filter(
                (item) => !item?.purchased & item?.is_owner
            );
            console.log(iTickets);

            const resTickets = iTickets.reduce(
                (acc, ticket) => [
                    ...acc,
                    {
                        seat: ticket.seat,
                        purchased: false,
                        reserve: true,
                    },
                ],
                []
            );

            setCurrentTickets((prevCurrentTickets) => ({
                ...prevCurrentTickets,
                tickets: resTickets,
            }));
        };
        initalizeTickets();
    }, []);

    const resetTickets = (seat) => {
        setCurrentTickets((prevCurrentTickets) => ({
            ...prevCurrentTickets,
            tickets: prevCurrentTickets.tickets.filter(
                (ticket) => ticket.seat === seat
            ).length
                ? [
                      ...prevCurrentTickets.tickets.filter(
                          (ticket) => ticket.seat != seat
                      ),
                  ]
                : [
                      ...prevCurrentTickets.tickets,
                      {
                          seat: parseInt(seat),
                          reserve: true,
                          purchased: false,
                      },
                  ],
        }));
    };

    const createTicket = async (obj) => {
        try {
            const { data } = await axiosRes.post("/tickets/", obj);
            setSeatToggle((prevSeatToggle) => !prevSeatToggle);
            resetTickets(obj.seat);
        } catch (err) {
            console.log(err);
        }
    };

    const deleteTicket = async (seat, ticketId) => {
        try {
            await axiosRes.delete(`/tickets/${ticketId}`);
            setSeatToggle((prevSeatToggle) => !prevSeatToggle);
            resetTickets(seat);
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = async (event) => {
        console.log("handlechange fired");

        const checkSeat = () => {
            const currentSeat = seatsPH[event.target.value - 1];
            const currentTicketId = seatsPH[event.target.value - 1]?.id;

            if (!currentSeat.purchased & !currentSeat.reserve) {
                const postObj = {
                    movie: currentBook?.id,
                    seat: event.target.value,
                    reserve: true,
                    show_date: Moment(currentShowDate, "MM/DD/YYYY").format(
                        "YYYY-MM-DD"
                    ),
                };
                createTicket(postObj);
            } else if (currentSeat.reserve & currentSeat.is_owner)
                deleteTicket(event.target.value, currentTicketId);
        };

        try {
            checkSeat();
        } catch (err) {
            console.log(err);
        }

        // checkTicket(event.target.value);

        // const getResult = async () => {
        //     const res = await test;
        //     console.log(res);
        // };
        // getResult();

        // setTicketData({
        //     ...ticketData,
        //     [event.target.name]: event.target.value,
        // });
    };

    return (
        <div className={`${styles.seats_main_container} v-flex-container`}>
            <div className={`${styles.seats_header_container} flex-container`}>
                <h3 className={`${styles.seats_header}`}>Available seats</h3>
            </div>
            <div className={`v-flex-container`}>
                <hr className={`${styles.seats_screen}`} />
                <h4 className={`${styles.seats_screen_text}`}>screen</h4>
            </div>
            <form className={`v-flex-container`}>
                {hasLoaded ? (
                    <ul className={`${styles.seats_container}`}>
                        {seatsPH?.map((seatPH) => (
                            <SeatItem
                                key={seatPH?.seat}
                                price={currentBook?.price}
                                seatInfo={seatInfo}
                                resetTickets={resetTickets}
                                purchased={seatPH?.purchased}
                                seat={seatPH?.seat}
                                reserve={seatPH?.reserve}
                                is_owner={seatPH?.is_owner}
                                on_change_function={handleChange}
                            />
                        ))}
                    </ul>
                ) : (
                    <div
                        className={`${styles.spinner_container} flex-container`}
                    >
                        <Asset spinner />
                    </div>
                )}
                {/* <div className={`flex-container`}>
                    <button className={`button`}>Book your ticket</button>
                </div> */}
            </form>
        </div>
    );
};

export default Seats;
