import React from "react";
import Logo from "../Logo";
import Map from "../map/Map";
import styles from "./styles/about.module.css";

const About = () => {
    return (
        <article className={`${styles.about_main_container} flex-container`}>
            <section
                className={`${styles.about_left_container} flex-container`}
            >
                <div
                    className={`${styles.about_image_container} image-container`}
                >
                    <img
                        className={`${styles.about_image} image`}
                        src="https://res.cloudinary.com/ahmad-mas/image/upload/v1707234392/media/images/projector_i02c99.jpg"
                        alt="Old projector picture"
                    />
                </div>
            </section>
            <div className={`${styles.about_right_container} v-flex-container`}>
                <section
                    className={`${styles.about_info_container} v-flex-container`}
                >
                    {/* <div>
                        <Logo height={100} />
                    </div> */}
                    <div
                        className={`${styles.about_info_text_container} v-flex-container`}
                    >
                        <div>
                            <h4>Glim: Where Family and Film Unite</h4>
                            <p>
                                Welcome to Glim, a charming oasis where the
                                magic of cinema comes alive for families and
                                friends. Nestled in the heart of our community,
                                our intimate theater promises an unforgettable
                                movie-going experience.
                            </p>
                            <h4>Community Connections</h4>
                            <p>
                                Glim isn’t just a theater; it’s a gathering
                                place. Join us for special events like family
                                movie nights, themed screenings, and cozy
                                holiday marathons. We celebrate birthdays,
                                anniversaries, and milestones with you, making
                                every visit a celebration of togetherness.
                            </p>
                        </div>
                        <div
                            className={`${styles.about_info_invitation} flex-container `}
                        >
                            <h4>
                                Come, step into Glim, where family bonds and
                                cinematic wonders intertwine. We can’t wait to
                                welcome you!
                            </h4>
                        </div>
                    </div>
                </section>
                <section
                    className={`${styles.about_map_container} flex-container`}
                >
                    <Map />
                </section>
            </div>
        </article>
    );
};

export default About;
