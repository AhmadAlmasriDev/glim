import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import SliderButton from "../slider_button/SliderButton";
import {useHistory} from "react-router-dom"
import DataContext from "../../context/DataContext";
import styles from "./styles/MovieTrailer.module.css";

const MovieTrailer = ({ trailer_link, title}) => {
    const history = useHistory()
    const {setShowTrailer, mainPage, setMainPage} = useContext(DataContext)
    
    const handleBack = ()=>{
        setShowTrailer(false)
        setMainPage(false)
        history.goBack()
    }
    

    return (
        <section className={`${styles.main_container} flex-container`}>
            <div className={`${styles.slider_button_container}`}>
                <SliderButton
                    on_click_function={mainPage ? handleBack : ()=>setShowTrailer(false)}
                    direction={"left"}
                />
                {/* <CloseButton on_click_function={setShowTrailer} /> */}
            </div>
            <Container className={`${styles.frame_container} `}>
                <div className={`embed-responsive embed-responsive-16by9`}>
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
