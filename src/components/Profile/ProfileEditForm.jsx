import React, { useState, useContext, useRef, useEffect } from "react";
import DataContext from "../../context/DataContext";
import { Form, Button, Alert, Col, Container, Image } from "react-bootstrap";
import { Link, useHistory, useParams } from "react-router-dom";
import styles from "./styles/Profile.module.css";
import { axiosReq } from "../../api/axiosDefaults";

import Asset from "../asset/Asset";

const ProfileEditForm = () => {
    const [errors, setErrors] = useState({});
    const { currentUser } = useContext(DataContext);
    const avatarInput = useRef(null);

    const history = useHistory();

    const [postData, setPostData] = useState({});
    const { name, email, avatar, about } = postData;

    const { id } = useParams();

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const { data } = await axiosReq.get(`/profiles/${id}`);

                data?.is_owner ? setPostData(data) : history.push("/");
            } catch (err) {
                console.log(err);
            }
        };
        fetchAll();
    }, [history, id]);

    const handleChange = (event) => {
        setPostData({
            ...postData,
            [event.target.name]: event.target.value,
        });
    };

    const handleChangeImage = (event) => {
        if (event.target.files.length) {
            URL.revokeObjectURL(avatar);
            setPostData({
                ...postData,
                avatar: URL.createObjectURL(event.target.files[0]),
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append("name", name);
        formData.append("email", email);
        avatarInput.current.files[0] &&
            formData.append("avatar", avatarInput.current.files[0]);
        formData.append("about", about);

        try {
            console.log(formData);
            await axiosReq.put(`/profiles/${id}`, formData);
            history.push(`/profiles/${id}`);
        } catch (err) {
            console.log(err);
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
    };

    return (
        <div className={`flex-container wrapper`}>
            <Container className={`${styles.profile_edit_container}`}>
                <h1 className={`${styles.header}`}>Edit Profile</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Row>
                        <Col md={12} lg={8}>
                            <Form.Row>
                                <Col sm={12} md={6}>
                                    <Form.Group controlId="name">
                                        <Form.Label>name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={name}
                                            name="name"
                                            onChange={handleChange}
                                            placeholder="Your name"
                                        />
                                    </Form.Group>
                                    {errors?.name?.map((message, idx) => (
                                        <Alert variant="warning" key={idx}>
                                            {message}
                                        </Alert>
                                    ))}
                                </Col>
                                <Col sm={12} md={6}>
                                    <Form.Group controlId="email">
                                        <Form.Label>Trailer link</Form.Label>
                                        <Form.Control
                                            type="email"
                                            value={email}
                                            name="email"
                                            onChange={handleChange}
                                            placeholder="Your email"
                                        />
                                    </Form.Group>
                                    {errors?.email?.map((message, idx) => (
                                        <Alert variant="warning" key={idx}>
                                            {message}
                                        </Alert>
                                    ))}
                                </Col>
                            </Form.Row>

                            <Form.Row>
                                <Col>
                                    <Form.Group controlId="about">
                                        <Form.Label>About</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={6}
                                            value={about}
                                            name="about"
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    {errors?.about?.map((message, idx) => (
                                        <Alert variant="warning" key={idx}>
                                            {message}
                                        </Alert>
                                    ))}
                                </Col>
                            </Form.Row>
                        </Col>
                        <Col className="flex-container">
                            <Form.Group
                                className={`${styles.avatar_main_container} text-center`}
                            >
                                {avatar ? (
                                    <>
                                        <div
                                            className={`${styles.avatar_container} image-container`}
                                        >
                                            <Image
                                                className={`image`}
                                                src={avatar}
                                            />
                                        </div>
                                        <div>
                                            <Form.Label
                                                className={`button`}
                                                htmlFor="image-upload"
                                            >
                                                Change the image
                                            </Form.Label>
                                        </div>
                                    </>
                                ) : (
                                    <Form.Label
                                        className="d-flex justify-content-center"
                                        htmlFor="image-upload"
                                    >
                                        <Asset
                                            upload={true}
                                            message="Click or tap to upload an image"
                                        />
                                    </Form.Label>
                                )}
                                {errors?.avatar?.map((message, idx) => (
                                    <Alert variant="warning" key={idx}>
                                        {message}
                                    </Alert>
                                ))}

                                <Form.File
                                    className="hidden"
                                    id="image-upload"
                                    accept="image/*"
                                    onChange={handleChangeImage}
                                    ref={avatarInput}
                                />
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Form.Row className={`${styles.buttons_container}`}>
                        <Col className={`flex-container`}>
                            <Button
                                className={`${styles.save_button} button`}
                                type="submit"
                            >
                                Save
                            </Button>
                            <Button
                                className={`${styles.cancel_button} button`}
                                onClick={() => history.goBack()}
                            >
                                Cancel
                            </Button>
                        </Col>
                    </Form.Row>
                </Form>
            </Container>
        </div>
    );
};

export default ProfileEditForm;
