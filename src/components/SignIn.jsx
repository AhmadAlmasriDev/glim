import React from 'react'
import { Form, Button, Image, Col, Row, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from '../styles/SignIn.module.css'
import Logo from './Logo'
import backImage from '../assets/signBackGround.jpg'



const SignIn = () => {
  return (
    <article className={`${styles.main_container} flex-container`}>
      <section className={`${styles.form_container} v-flex-container`}>
        <div>
          <Logo/>
        </div>
        <h1>Sign in</h1>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          
          <Button variant="primary" type="submit">
            Sign In
          </Button>
        </Form>
        <div>
          <a href="">I don't have an account!</a>
        </div>
        


      </section>
      <section className={`${styles.back_ground_container} flex-container`}>
        <div className={`${styles.image_container} flex-container`}>
          <img className={`${styles.back_ground_image} flex-container`} src={backImage} alt="Red cinema seats" />

        </div>
        
      </section>


    </article>
  )
}

export default SignIn