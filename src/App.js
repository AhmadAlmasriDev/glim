import styles from "./App.module.css";
import NavBar from "./components/nav_bar/NavBar";
import SideNav from "./components/side_nav/SideNav";
import Carousel from "./components/home/FilmCarousel";
import SignIn from "./components/sign/SignIn";
import SignUp from "./components/sign/SignUp";
import Movies from "./components/movies/Movies";
import About from "./components/about/About";
import Contact from "./components/contact/Contact";
import MovieCreateForm from "./components/movie_create_form/MovieCreateForm";

import { useContext, useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import DataContext, { DataProvider } from "./context/DataContext";

import { axiosReq, axiosRes } from "./api/axiosDefaults";

import "./api/axiosDefaults";
import MovieDetail from "./components/movie_details/MovieDetail";

function App() {
    return (
        <div className={styles.App}>
            <DataProvider>
                <NavBar />
                <SideNav />
                <Switch>
                    <Route exact path="/" render={() => <Carousel />} />
                    <Route exact path="/signin" render={() => <SignIn />} />
                    <Route exact path="/signup" render={() => <SignUp />} />
                    <Route exact path="/movies" render={() => <Movies />} />
                    <Route exact path="/about" render={() => <About />} />
                    <Route exact path="/contact" render={() => <Contact />} />
                    <Route
                        exact
                        path="/movies/add-movie"
                        render={() => <MovieCreateForm />}
                    />
                    <Route
                        exact
                        path="/movies/:id"
                        render={() => <MovieDetail />}
                    />
                </Switch>
            </DataProvider>
        </div>
    );
}

export default App;
