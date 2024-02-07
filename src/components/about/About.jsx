import React from "react";
import Logo from "../Logo";
import Map from "../map/Map";
import styles from "./styles/styles.module.css";

const About = () => {
    return (
        <article className={`flex-container wrapper`}>
            <div>
                {/* <section>
                    <div className={`image-container`}>
                        <img
                            src="https://res.cloudinary.com/ahmad-mas/image/upload/v1707234392/media/images/projector_i02c99.jpg"
                            alt="Old projector picture"
                        />
                    </div>
                </section> */}
                <div>
                    <section>
                        <div>
                            <Logo height={100} />
                        </div>
                    </section>
                    <section>
                        <Map />
                    </section>
                </div>
            </div>
        </article>
    );
};

export default About;
