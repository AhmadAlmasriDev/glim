import styles from './App.module.css';
import NavBar from './components/NavBar';
import SideNav from "./components/SideNav"
import Carousel from './components/FilmCarousel';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Movies from './components/Movies'
import About from './components/About'
import Contact from './components/Contact'

import { useContext, useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import DataContext, { DataProvider} from './context/DataContext';

import { axiosReq, axiosRes } from "./api/axiosDefaults";

import './api/axiosDefaults'


function App() {
  // const {setCurrentUser} = useContext(DataContext)
  
  

  return (
    <div className={styles.App}>
      <DataProvider>
        <NavBar/>
        <SideNav/>
        <Switch>
          <Route exact path = '/' render = {()=> <Carousel/>}/>
          <Route exact path = '/signin' render = {()=> <SignIn/>}/>
          <Route exact path = '/signup' render = {()=> <SignUp/>}/>
          <Route exact path = '/movies' render = {()=> <Movies/>}/>
          <Route exact path = '/about' render = {()=> <About/>}/>
          <Route exact path = '/contact' render = {()=> <Contact/>}/>
        </Switch>
      </DataProvider>
      
      

    </div>
  );
}

export default App;
 