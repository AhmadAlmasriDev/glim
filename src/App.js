import styles from './App.module.css';
import NavBar from './components/NavBar';
import SideNav from "./components/SideNav"
function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <SideNav />
    </div>
  );
}

export default App;
 