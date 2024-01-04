
import React, { useState, useContext, useRef } from 'react'
import DataContext from "../../context/DataContext"
import { Form, Button, Alert, Col, Row, Container, Image } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import styles from './styles/MovieCreateForm.module.css'
import axios from 'axios';
import { axiosReq } from "../../api/axiosDefaults";

import Asset from '../asset/Asset';


const MovieCreateForm = () => {
    const {currentUser} = useContext(DataContext)
    const [errors, setErrors] = useState({});
    const posterInput = useRef(null) 
    const history = useHistory();

    const [postData, setPostData] = useState({
        title:'',
        trailer:'',
        manager:'',
        manager_name:'',
        start_date:'',
        end_date:'',
        session_time:'',
        rated:'',
        year:'',
        director:'',
        genre:'',
        distribution:'',
        actors:'',
        poster:'',
        discreption:'',
        price:'',
        status:'',
      })
    const {
        title,
        trailer,
        manager_name,
        start_date,
        end_date,
        session_time,
        rated, year,
        director,
        genre,
        distribution,
        actors,
        poster,
        discreption,
        price,
        status,
    } = postData

    const handleChange = (event) => {
        setPostData({
          ...postData,
          [event.target.name]: event.target.value,
        });
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
        formData.append("manager_name", currentUser?.username);
              
        try {
          const { data } = await axiosReq.post("/movies/", formData);
          history.push(`/movies/${data.id}`);
        } catch (err) {
          console.log(err);
          if (err.response?.status !== 401) {
            setErrors(err.response?.data);
          }
        }
    };


    return (
    <Container>
        <h1 className={`${styles.header}`}>Add a movie</h1>
        <Form onSubmit={handleSubmit}>
            <Form.Row>
                <Col md={12} lg={8}>
                    <Form.Row>
                        <Col sm={12} md={6}>
                            <Form.Group controlId="title">
                                <Form.Label>Title</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    value = {title}
                                    name = "title"
                                    onChange={handleChange}
                                    placeholder="Title" 
                                />
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={6}>
                            <Form.Group controlId="trailer">
                                <Form.Label>Trailer link</Form.Label>
                                <Form.Control 
                                    type="url" 
                                    value = {trailer}
                                    name = "trailer"
                                    onChange={handleChange}
                                    placeholder="Trailer link"
                                />
                            </Form.Group>
                        </Col>

                    </Form.Row>
                    <Form.Row>
                        <Col xs={12} sm={4}>
                            <Form.Group controlId="start_date">
                                <Form.Label>Start date</Form.Label>
                                <Form.Control 
                                    type="date" 
                                    value = {start_date}
                                    name = "start_date"
                                    onChange={handleChange}
                                    placeholder="Start date"
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={12} sm={4}>
                            <Form.Group controlId="end_date">
                                <Form.Label>End date</Form.Label>
                                <Form.Control 
                                    type="date" 
                                    value = {end_date}
                                    name = "end_date"
                                    onChange={handleChange}
                                    placeholder="End date"
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={12} sm={4}>
                            <Form.Group controlId="session_time">
                                <Form.Label>Session time</Form.Label>
                                <Form.Control 
                                    type="time"
                                    value = {session_time}
                                    name = "session_time"
                                    onChange={handleChange}
                                    placeholder="Session time"
                                />
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col xs={12} sm={4}>
                            <Form.Group controlId="rated">
                                <Form.Label>Rated</Form.Label>
                                <Form.Control 
                                    as="select"
                                    value = {rated}
                                    name = "rated"
                                    onChange={handleChange}
                                >
                                <option>G</option>
                                <option>PG</option>
                                <option>PG-13</option>
                                <option>NC-17</option>
                                <option>R</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col xs={12} sm={4}>
                            <Form.Group controlId="year">
                                <Form.Label>Year</Form.Label>
                                <Form.Control 
                                    as="select"
                                    value = {year}
                                    name = "year"
                                    onChange={handleChange}
                                >
                                <option>1990</option>
                                <option>1990</option>
                                <option>1990</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col xs={12} sm={4}>
                            <Form.Group controlId="price">
                                <Form.Label>Price</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    value = {price}
                                    name = "price"
                                    onChange={handleChange}
                                    placeholder="Price"
                                />
                            </Form.Group>
                        </Col>

                    </Form.Row>
                    <Form.Row>
                        <Col sm={12} md={6}>
                            <Form.Group controlId="director">
                                <Form.Label>Director</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    value = {director}
                                    name = "director"
                                    onChange={handleChange}
                                    placeholder="Director"
                                />
                            </Form.Group>
                            <Form.Group controlId="genre">
                                <Form.Label>Genre</Form.Label>
                                <Form.Control 
                                    type="text"
                                    value = {genre} 
                                    name = "genre"
                                    onChange={handleChange}
                                    placeholder="Genre"
                                />
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={6}>
                            <Form.Group controlId="distribution">
                                <Form.Label>Distribution</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    value = {distribution}
                                    name = "distribution"
                                    onChange={handleChange}
                                    placeholder="Distribution"
                                />
                            </Form.Group>
                            <Form.Group controlId="actors">
                                <Form.Label>Actors</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    value = {actors}
                                    name = "actors"
                                    onChange={handleChange}
                                    placeholder="Actors"
                                />
                            </Form.Group>
                        </Col>

                    </Form.Row>

                    <Form.Row>
                        <Col>
                            <Form.Group controlId="discreption">
                                <Form.Label>Discreption</Form.Label>
                                <Form.Control 
                                    as="textarea" 
                                    rows={6} 
                                    value = {discreption}
                                    name = "discreption"
                                    onChange={handleChange}
                                    />
                            </Form.Group>
                        </Col>
                    </Form.Row>

                    <Form.Row>
                        <Col  xs={12} sm={4}>
                            <Form.Group controlId="status" >
                                <Form.Label>Status</Form.Label>
                                <Form.Control 
                                    as="select"
                                    value = {status}
                                    name = "status"
                                    onChange={handleChange}
                                    >
                                <option>Draft</option>
                                <option>Published</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Form.Row>
                </Col>
                <Col className='flex-container'>
                <Form.Group className={`${styles.poster_main_container} text-center`}>
              {poster ? (
                <>
                  <div className={`${styles.poster_container} image-container`}>
                    <Image className={`${styles.poster}`} src={poster} />
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
                    upload= {true}
                    message="Click or tap to upload an image"
                  />
                </Form.Label>
              )}

              <Form.File 
                className='hidden'
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref = {posterInput}
              />
            </Form.Group>
                </Col>
            </Form.Row>
            <Form.Row className={`${styles.buttons_container}`}>
                <Col  className={`flex-container`}>
                    <Button className={`${styles.save_button} button`} type="submit">
                    Save
                    </Button>
                    <Button className={`${styles.cancel_button} button`} onClick={() => history.goBack()}>
                    Cancel
                    </Button>
                </Col>
            </Form.Row>
        </Form>
    </Container>
  )
}

export default MovieCreateForm