import React, { useState } from "react";

import styles from "./styles/MovieDetail.module.css";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";

const MovieDetailcommentForm = ({
    currentUser,
    setCurrentMovie,
    currentMovie,
    setComments,
    notApproved,
}) => {
    const [content, setContent] = useState("");
    const handleChange = (event) => {
        setContent(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axiosRes.post("/comments/", {
                comment_body: content,
                movie: currentMovie[0]?.id,
            });
            setComments((prevComments) => ({
                ...prevComments,
                results: [data, ...prevComments.results],
            }));
            setCurrentMovie((prevCurrentMovie) => [
                {
                    ...prevCurrentMovie[0],
                    comments_count: prevCurrentMovie[0].comments_count + 1,
                },
            ]);
            setContent("");
        } catch (err) {
            console.log(err);
        }
    };

    return currentUser ? (
        notApproved ? (
            <div
                className={`${styles.comment_form_container} v-flex-container`}
            >
                <p className={`${styles.comment_form_header} `}>
                    Your comment is waiting approval
                </p>
                <button
                    className={`${styles.disabled_button} button`}
                    disabled={true}
                >
                    Submit
                </button>
            </div>
        ) : (
            <>
                <Form
                    className={`${styles.comment_form_container}`}
                    onSubmit={handleSubmit}
                >
                    <Form.Group controlId="comment_body">
                        <Form.Label
                            className={`${styles.comment_form_header} `}
                        >
                            Add a comment
                        </Form.Label>
                        <Form.Control
                            className={`${styles.comment_text_form_container}`}
                            as="textarea"
                            rows={4}
                            value={content}
                            name="comment_body"
                            onChange={handleChange}
                        />
                        {console.log(notApproved)}
                    </Form.Group>
                    <div className={`flex-container`}>
                        <button className={`button`}>Submit</button>
                    </div>
                </Form>
            </>
        )
    ) : (
        <div className={`${styles.comment_form_container} v-flex-container`}>
            <p className={`${styles.comment_form_header} `}>
                Please login to comment
            </p>
            <Link className={`button`} to="/login">
                Login
            </Link>
        </div>
    );
};

export default MovieDetailcommentForm;
