import React from 'react'
import { Form, Button, Image, Col, Row, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from '../styles/SignInUp.module.css'
import Logo from './Logo'
import backImage from '../assets/signBackGround.jpg'



const SignIn = () => {
  return (
    <article className={`${styles.main_container} flex-container`}>
      <section className={`${styles.form_container} v-flex-container`}>
        <div>
          <Logo className={styles.logo} height={130}/>
        </div>
        <h1 className={`${styles.form_header}`}>Sign in</h1>
        <Form className={`${styles.form} v-flex-container`}>
          <Form.Group className={`${styles.form_input_container}`} controlId="username">
            <Form.Label className={`display-non`}>User name</Form.Label>
            <Form.Control type="text" placeholder="User name" />
            
          </Form.Group>

          <Form.Group className={`${styles.form_input_container}`} controlId="password1">
            <Form.Label className={`display-non`}>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

                    
          <Button className={`${styles.form_button} button`} type="submit">
            Sign In
          </Button>
          <div className={`${styles.link_container} flex-container`}>
            <Link className={`${styles.signup_link}`} to='/signup'>I don't have an account!</Link>
          </div>
          
        </Form>
        


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