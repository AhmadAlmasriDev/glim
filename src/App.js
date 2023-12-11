import styles from './App.module.css';
import NavBar from './components/NavBar';
import SideNav from "./components/SideNav"
import Carousel from './components/FilmCarousel';
import { useState } from 'react';

function App() {
  const [viewSideNav, setViewSideNav] = useState(false)


  return (
    <div className={styles.App}>
      <NavBar 
        viewSideNav = {viewSideNav} 
        setViewSideNav ={setViewSideNav}
        />
      <SideNav viewSideNav={viewSideNav}/>
      <Carousel/>
    </div>
  );
}

export default App;
 