
import './App.css';
import { Navbar } from './Components/Navbar/Navbar';
import { SideNav } from './Components/SideNav/SideNav';
import { useState } from 'react';
import { LandingDash } from './Components/LandingDash/LandingDash';


function App() {

  const [sidenavopen, setSidenavopen] = useState(false);

  const sidenavmanager = () => {
    setSidenavopen(!sidenavopen)
  }

  return (
    <div className="App">

      <Navbar sidenavopenfun = {sidenavmanager}  sidenavstatus = {sidenavopen}/>
      <SideNav sidenavstatus = {sidenavopen} />
      <LandingDash sidenavopenfun = {sidenavmanager} sidenavstatus = {sidenavopen}/>
    </div>
  );
}

export default App;
