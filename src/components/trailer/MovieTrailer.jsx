import React, { useState } from "react";
import { Container } from "react-bootstrap";
import CloseButton from "../side_nav/CloseButton";
import SliderButton from "../slider_button/SliderButton";
import styles from "./styles/MovieTrailer.module.css";

const MovieTrailer = ({ trailer_link, setShowTrailer, title }) => {
    return (
        <section className={`flex-container`}>
            <div className={`${styles.slider_button_container}`}>
                <SliderButton
                    on_click_function={setShowTrailer}
                    direction={"left"}
                />
                {/* <CloseButton on_click_function={setShowTrailer} /> */}
            </div>
            <Container>
                <div className="embed-responsive embed-responsive-16by9">
                    <iframe
                        className="embed-responsive-item"
                        src={trailer_link}
                        title={`${title} movie trailer`}
                        allowFullScreen
                    ></iframe>
                </div>
            </Container>
        </section>
    );
};

export default MovieTrailer;
