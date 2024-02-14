import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import styles from "./styles/SignInUp.module.css";
import Logo from "../Logo";
import axios from "axios";

const SignUp = () => {
    const [signUpData, setSignUpData] = useState({
        username: "",
        password1: "",
        password2: "",
    });
    const [errors, setErrors] = useState({});
    const history = useHistory();
    const { username, password1, password2 } = signUpData;
    /*
    Change handle function
    */
    const handleChange = (event) => {
        setSignUpData({
            ...signUpData,
            [event.target.name]: event.target.value,
        });
    };
    /*
    Submit handle function
    */
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("/dj-rest-auth/registration/", signUpData);
            history.push("/signin");
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
                <h1 className={`${styles.form_header}`}>Sign up</h1>
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
                        controlId="password1"
                    >
                        <Form.Label className={`display-non`}>
                            Password
                        </Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            name="password1"
                            value={password1}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    {errors.password1?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>
                            {message}
                        </Alert>
                    ))}
                    <Form.Group
                        className={`${styles.form_input_container}`}
                        controlId="password2"
                    >
                        <Form.Label className={`display-non`}>
                            Confirm password
                        </Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm password"
                            name="password2"
                            value={password2}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    {errors.password2?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>
                            {message}
                        </Alert>
                    ))}
                    <Button
                        className={`${styles.form_button} button`}
                        type="submit"
                    >
                        Sign up
                    </Button>
                    <div className={`${styles.link_container} flex-container`}>
                        <Link className={`${styles.signup_link}`} to="/signin">
                            I already have an account!
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

export default SignUp;
