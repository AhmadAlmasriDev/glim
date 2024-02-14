import React, { useEffect, useContext, useState } from "react";
import DataContext from "../../context/DataContext";
import styles from "./styles/Profile.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import { useParams } from "react-router";
import ProfileTicket from "./ProfileTicket";
import ProfileInfo from "./ProfileInfo";
import Asset from "../asset/Asset";
import ProfileComment from "./ProfileComment";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import { useHistory } from "react-router-dom";

const Profile = () => {
    const history = useHistory();
    const { id } = useParams();
    const { currentUser } = useContext(DataContext);
    const [hasLoaded, setHasLoaded] = useState(false);
    const [userTickets, setUserTickets] = useState([]);
    const [userComments, setUserComments] = useState([]);
    const [movies, setMovies] = useState([]);
    const [userProfile, setUserProfile] = useState({});
    const [infoToggle, setInfoToggle] = useState(true);
    /*
    Fetch profiles, movies, tickets, comments
    */
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    { data: profile },
                    { data: movies },
                    { data: tickets },
                    { data: comments },
                ] = await Promise.all([
                    axiosReq.get(`/profiles/${id}`),
                    axiosReq.get(`/movies`),
                    axiosReq.get(`/tickets/?owner=${id}`),
                    axiosReq.get(`/comments/?owner=${id}`),
                ]);
                setUserProfile(profile);
                setMovies(movies);
                setUserTickets(tickets);
                setUserComments(comments);
                setHasLoaded(true);
            } catch (err) {
                console.log(err);
            }
        };
        setHasLoaded(false);
        fetchData();
    }, [id]);
    /*
    Dispaly message 
    */
    const message = (message) => (
        <div className={`${styles.ticket_message_container} flex-container`}>
            <h3 className={`${styles.tickets_message}`}>{message}</h3>
        </div>
    );

    return (
        <article className={`${styles.profile_wrapper} flex-container wrapper`}>
            {hasLoaded ? (
                userProfile?.is_owner ? (
                    <div
                        className={`${styles.main_container} flex-container wrapper`}
                    >
                        <ProfileInfo
                            profile={userProfile}
                            currentUser={currentUser}
                            infoToggle={infoToggle}
                            setInfoToggle={setInfoToggle}
                        />

                        <section
                            className={`${styles.tickets_section} v-flex-container`}
                        >
                            <div>
                                <h2 className={`${styles.tickets_header}`}>
                                    {infoToggle ? "Tickets" : "Comments"}
                                </h2>
                            </div>
                            <div
                                className={`${styles.tickets_main_container} v-flex-container`}
                            >
                                {infoToggle ? (
                                    userTickets.filter((item) => item.purchased)
                                        .length ? (
                                        userTickets
                                            .filter(
                                                (ticket) => ticket?.purchased
                                            )
                                            .map((ticket) => (
                                                <ProfileTicket
                                                    key={ticket?.id}
                                                    currentMovie={
                                                        movies?.filter(
                                                            (movie) =>
                                                                movie?.id ==
                                                                ticket?.movie
                                                        )[0]
                                                    }
                                                    seat={ticket?.seat}
                                                    date={ticket?.show_date}
                                                />
                                            ))
                                    ) : (
                                        message("No Tickets To Display")
                                    )
                                ) : (
                                    <InfiniteScroll
                                        children={
                                            userComments?.results?.filter(
                                                (item) => item.approved
                                            ).length
                                                ? userComments?.results
                                                      .filter(
                                                          (comment) =>
                                                              comment?.approved
                                                      )
                                                      .map((comment) => (
                                                          <ProfileComment
                                                              key={comment?.id}
                                                              currentMovie={
                                                                  movies?.filter(
                                                                      (movie) =>
                                                                          movie?.id ==
                                                                          comment?.movie
                                                                  )[0]
                                                              }
                                                              comment={comment}
                                                          />
                                                      ))
                                                : message(
                                                      "No Comments To Display"
                                                  )
                                        }
                                        dataLength={userComments.results.length}
                                        loader={<Asset spinner />}
                                        hasMore={!!userComments.next}
                                        next={() =>
                                            fetchMoreData(
                                                userComments,
                                                setUserComments
                                            )
                                        }
                                    />
                                )}
                            </div>
                        </section>
                    </div>
                ) : (
                    history.push("/")
                )
            ) : (
                <Asset spinner />
            )}
        </article>
    );
};

export default Profile;
