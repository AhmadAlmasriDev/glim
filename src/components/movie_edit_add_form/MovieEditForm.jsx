import React, { useState, useContext, useRef, useEffect} from "react";
import Moment from "moment";
import DataContext from "../../context/DataContext";
import {
    Form,
    Button,
    Alert,
    Col,
    Row,
    Container,
    Image,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import styles from "./styles/MovieCreateForm.module.css";
import axios from "axios";
import { axiosReq } from "../../api/axiosDefaults";

import Asset from "../asset/Asset";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const MovieEditForm = () => {

    const [errors, setErrors] = useState({});
    const [ratings, setRatings] = useState([]);
    const {currentUser} = useContext(DataContext);
    const posterInput = useRef(null);
    
    const history = useHistory();


    const years = () => {
        let yearsArr = [];
        let currentYear = new Date().getFullYear();
        for (currentYear; currentYear >= 1980; currentYear--) {
            yearsArr.push(currentYear);
        }
        return yearsArr;
    };

    // const currentDate = Moment().format("YYYY-MM-DD");

    const [postData, setPostData] = useState({
        // title: "",
        // trailer: "",
        // manager: "",

        // start_date: currentDate,
        // end_date: currentDate,
        // session_time: "00:00:00",
        // rated: "",
        // year: "",
        // director: "",
        // genre: "",
        // distribution: "",
        // actors: "",
        // poster: "",
        // discreption: "",
        // price: "",
        // status: "",
    });
    const {
        title,
        trailer,

        start_date,
        end_date,
        session_time,
        rated,
        year,
        director,
        genre,
        distribution,
        actors,
        poster,
        discreption,
        price,
        status,
    } = postData;
    
    const {id} = useParams()

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const [{ data:ratings}, {data:prev_data}] = await Promise.all([

                    axiosReq.get(`/movies/service`),
                    axiosReq.get(`/movies/${id}`),
                ]
                ) 
                setRatings(ratings[0]?.service.ratings);

                prev_data?.is_admin ? setPostData({
                    ...prev_data, 
                    start_date: Moment(prev_data?.start_date).format("YYYY-MM-DD") ,
                    end_date: Moment(prev_data?.end_date).format("YYYY-MM-DD"), 
                }) : history.push("/");
                // setPostData({test: "test"})

                
            } catch (err) {
                console.log(err);
            }
            
        };
        // const fetchRatings = async () => {
        //     try {
        //         const { data } = await axiosReq.get(`/movies/service`);
        //         setRatings(data[0]?.service.ratings);
                
        //     } catch (err) {
        //         console.log(err);
        //     }
            
        // };

        
        fetchAll();
    }, [history, id]); 




    const handleChange = (event) => {
        setPostData({
            ...postData,
            [event.target.name]: event.target.value,
        });
        // console.log(postData)
    };

    const handleChangeImage = (event) => {
        if (event.target.files.length) {
            URL.revokeObjectURL(poster);
            setPostData({
                ...postData,
                poster: URL.createObjectURL(event.target.files[0]),
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append("title", title);
        formData.append("trailer", trailer);
        posterInput.current.files[0] &&
        formData.append("poster", posterInput.current.files[0]);
        formData.append("start_date", start_date);
        formData.append("end_date", end_date);
        formData.append("session_time", session_time);
        formData.append("rated", rated);
        formData.append("year", year);
        formData.append("director", director);
        formData.append("genre", genre);
        formData.append("distribution", distribution);
        formData.append("actors", actors);
        formData.append("discreption", discreption);
        formData.append("price", price);
        formData.append("status", status);
        // formData.append("manager_name", currentUser?.username);

        try {
            console.log(formData);
            await axiosReq.put(`/movies/${id}`, formData);
            history.push(`/movies/${id}`);
        } catch (err) {
            console.log(err);
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
    };

    return (
        <Container>
            {console.log(postData)}
            <h1 className={`${styles.header}`}>Edit a movie</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Row>
                    <Col md={12} lg={8}>
                        <Form.Row>
                            <Col sm={12} md={6}>
                                <Form.Group controlId="title">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={title}
                                        name="title"
                                        onChange={handleChange}
                                        placeholder="Title"
                                    />
                                </Form.Group>
                                {errors?.title?.map((message, idx) => (
                                    <Alert variant="warning" key={idx}>
                                        {message}
                                    </Alert>
                                ))}
                            </Col>
                            <Col sm={12} md={6}>
                                <Form.Group controlId="trailer">
                                    <Form.Label>Trailer link</Form.Label>
                                    <Form.Control
                                        type="url"
                                        value={trailer}
                                        name="trailer"
                                        onChange={handleChange}
                                        placeholder="Trailer link"
                                    />
                                </Form.Group>
                                {errors?.trailer?.map((message, idx) => (
                                    <Alert variant="warning" key={idx}>
                                        {message}
                                    </Alert>
                                ))}
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col xs={12} sm={4}>
                                <Form.Group controlId="start_date">
                                    <Form.Label>Start date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={start_date}
                                        name="start_date"
                                        onChange={handleChange}
                                        placeholder="Start date"
                                    />
                                </Form.Group>
                                {errors?.start_date?.map((message, idx) => (
                                    <Alert variant="warning" key={idx}>
                                        {message}
                                    </Alert>
                                ))}
                            </Col>
                            <Col xs={12} sm={4}>
                                <Form.Group controlId="end_date">
                                    <Form.Label>End date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={end_date}
                                        name="end_date"
                                        onChange={handleChange}
                                        placeholder="End date"
                                    />
                                </Form.Group>
                                {errors?.end_date?.map((message, idx) => (
                                    <Alert variant="warning" key={idx}>
                                        {message}
                                    </Alert>
                                ))}
                            </Col>
                            <Col xs={12} sm={4}>
                                <Form.Group controlId="session_time">
                                    <Form.Label>Session time</Form.Label>
                                    <Form.Control
                                        type="time"
                                        value={session_time}
                                        name="session_time"
                                        onChange={handleChange}
                                        placeholder="Session time"
                                    />
                                </Form.Group>
                                {errors?.session_time?.map((message, idx) => (
                                    <Alert variant="warning" key={idx}>
                                        {message}
                                    </Alert>
                                ))}
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col xs={12} sm={4}>
                                <Form.Group controlId="rated">
                                    <Form.Label>Rated</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={rated}
                                        name="rated"
                                        onChange={handleChange}
                                    >
                                        {ratings.map((rating, idx) => (
                                            <option key={rating} value={idx}>
                                                {rating}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                                {errors?.rated?.map((message, idx) => (
                                    <Alert variant="warning" key={idx}>
                                        {message}
                                    </Alert>
                                ))}
                            </Col>
                            <Col xs={12} sm={4}>
                                <Form.Group controlId="year">
                                    <Form.Label>Year</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={year}
                                        name="year"
                                        onChange={handleChange}
                                    >
                                        {years().map((year, idx) => (
                                            <option key={idx} value={year}>
                                                {year}
                                            </option>
                                        ))}
                                    </Form.Control>
                                    {errors?.year?.map((message, idx) => (
                                        <Alert variant="warning" key={idx}>
                                            {message}
                                        </Alert>
                                    ))}
                                </Form.Group>
                            </Col>
                            <Col xs={12} sm={4}>
                                <Form.Group controlId="price">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                        type="number"
                                        min={1}
                                        value={price}
                                        name="price"
                                        onChange={handleChange}
                                        placeholder="Price"
                                    />
                                </Form.Group>
                                {errors?.price?.map((message, idx) => (
                                    <Alert variant="warning" key={idx}>
                                        {message}
                                    </Alert>
                                ))}
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col sm={12} md={6}>
                                <Form.Group controlId="director">
                                    <Form.Label>Director</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={director}
                                        name="director"
                                        onChange={handleChange}
                                        placeholder="Director"
                                    />
                                </Form.Group>
                                {errors?.director?.map((message, idx) => (
                                    <Alert variant="warning" key={idx}>
                                        {message}
                                    </Alert>
                                ))}
                                <Form.Group controlId="genre">
                                    <Form.Label>Genre</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={genre}
                                        name="genre"
                                        onChange={handleChange}
                                        placeholder="Genre"
                                    />
                                </Form.Group>
                                {errors?.genre?.map((message, idx) => (
                                    <Alert variant="warning" key={idx}>
                                        {message}
                                    </Alert>
                                ))}
                            </Col>
                            <Col sm={12} md={6}>
                                <Form.Group controlId="distribution">
                                    <Form.Label>Distribution</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={distribution}
                                        name="distribution"
                                        onChange={handleChange}
                                        placeholder="Distribution"
                                    />
                                </Form.Group>
                                {errors?.distribution?.map((message, idx) => (
                                    <Alert variant="warning" key={idx}>
                                        {message}
                                    </Alert>
                                ))}
                                <Form.Group controlId="actors">
                                    <Form.Label>Actors</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={actors}
                                        name="actors"
                                        onChange={handleChange}
                                        placeholder="Actors"
                                    />
                                </Form.Group>
                                {errors?.actors?.map((message, idx) => (
                                    <Alert variant="warning" key={idx}>
                                        {message}
                                    </Alert>
                                ))}
                            </Col>
                        </Form.Row>

                        <Form.Row>
                            <Col>
                                <Form.Group controlId="discreption">
                                    <Form.Label>Discreption</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={6}
                                        value={discreption}
                                        name="discreption"
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                {errors?.discreption?.map((message, idx) => (
                                    <Alert variant="warning" key={idx}>
                                        {message}
                                    </Alert>
                                ))}
                            </Col>
                        </Form.Row>

                        <Form.Row>
                            <Col xs={12} sm={4}>
                                <Form.Group controlId="status">
                                    <Form.Label>Status</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={status}
                                        name="status"
                                        onChange={handleChange}
                                    >
                                        <option value={0}>Draft</option>
                                        <option value={1}>Published</option>
                                    </Form.Control>
                                </Form.Group>
                                {errors?.status?.map((message, idx) => (
                                    <Alert variant="warning" key={idx}>
                                        {message}
                                    </Alert>
                                ))}
                            </Col>
                        </Form.Row>
                    </Col>
                    <Col className="flex-container">
                        <Form.Group
                            className={`${styles.poster_main_container} text-center`}
                        >
                            {poster ? (
                                <>
                                    <div
                                        className={`${styles.poster_container} image-container`}
                                    >
                                        <Image
                                            className={`image`}
                                            src={poster}
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
                            {errors?.poster?.map((message, idx) => (
                                <Alert variant="warning" key={idx}>
                                    {message}
                                </Alert>
                            ))}

                            <Form.File
                                className="hidden"
                                id="image-upload"
                                accept="image/*"
                                onChange={handleChangeImage}
                                ref={posterInput}
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
    );
};

export default MovieEditForm;
