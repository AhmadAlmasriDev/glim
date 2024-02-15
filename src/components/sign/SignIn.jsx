import React, { useContext, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import styles from "./styles/SignInUp.module.css";
import Logo from "../Logo";

import DataContext from "../../context/DataContext";
import axios from "axios";
import { setTokenTimestamp } from "../../utils/utils";

const SignIn = () => {
    const { setCurrentUser } = useContext(DataContext);
    const [signInData, setSignInData] = useState({
        username: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const history = useHistory();
    const { username, password } = signInData;
    /*
    Change handle function
    */
    const handleChange = (event) => {
        setSignInData({
            ...signInData,
            [event.target.name]: event.target.value,
        });
    };
    /*
    Submit handle function
    */
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios.post(
                "/dj-rest-auth/login/",
                signInData
            );
            setCurrentUser(data.user);
            setTokenTimestamp(data);
            history.goBack();
        } catch (err) {
            setErrors(err.response?.data);
        }
    };

    return (
        <article className={`${styles.main_container} flex-container`}>
            <section className={`${styles.form_container} v-flex-container`}>
                <div>
                    <Logo className={styles.logo} height={80} />
                </div>
                <h1 className={`${styles.form_header}`}>Sign in</h1>
                <Form
                    className={`${styles.form} v-flex-container`}
                    onSubmit={handleSubmit}
                >
                    <Form.Group
                        className={`${styles.form_input_container}`}
                        controlId="username"
                    >
                        <Form.Label className={`display-non`}>
                            User name
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="User name"
                            name="username"
                            value={username}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    {errors.username?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>
                            {message}
                        </Alert>
                    ))}
                    <Form.Group
                        className={`${styles.form_input_container}`}
                        controlId="password"
                    >
                        <Form.Label className={`display-non`}>
                            Password
                        </Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Button
                        className={`${styles.form_button} button`}
                        type="submit"
                    >
                        Sign in
                    </Button>
                    <div className={`${styles.link_container} flex-container`}>
                        <Link className={`${styles.signup_link}`} to="/signup">
                            I don't have an account!
                        </Link>
                    </div>
                    {errors.non_field_errors?.map((message, idx) => (
                        <Alert key={idx} variant="warning" className="mt-3">
                            {message}
                        </Alert>
                    ))}
                </Form>
            </section>
            <section
                className={`${styles.back_ground_container} flex-container`}
            >
                <div className={`${styles.image_container} flex-container`}>
                    <img
                        className={`${styles.back_ground_image} flex-container`}
                        src={`https://res.cloudinary.com/ahmad-mas/image/upload/v1707847168/media/images/signBackGround_xwxmvd.jpg`}
                        alt="Red cinema seats"
                    />
                </div>
            </section>
        </article>
    );
};

export default SignIn;
