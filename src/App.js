
import './App.css';
import { Navbar } from './Components/Navbar/Navbar';
import { SideNav } from './Components/SideNav/SideNav';
import { useState } from 'react';
import { LandingDash } from './Components/LandingDash/LandingDash';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [sidenavopen, setSidenavopen] = useState(false);

  const sidenavmanager = () => {
    setSidenavopen(!sidenavopen)
  }

  const toastsucess =() => {

      toast.success("Data Created Sucessfully")

  }

  return (
    <div className="App">
      <ToastContainer />
      <Navbar sidenavopenfun = {sidenavmanager}  sidenavstatus = {sidenavopen}/>
      <SideNav sidenavstatus = {sidenavopen} toastmanager = {toastsucess} />
      <LandingDash sidenavopenfun = {sidenavmanager} sidenavstatus = {sidenavopen}/>
    </div>
  );
}

export default App;
