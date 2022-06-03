
import './App.css';

import Home from "./pages/home/Home";
import Fillform from "./pages/fillform/Fillform";
import AboutUs from "./pages/aboutus/AboutUs";
import UseMap from "./pages/useMap/UseMap";
import UseMapp from "./pages/useMapp/UseMapp";

import UseCoordinates from "./pages/useCoordinates/UseCoordinates";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";



//import {Person} from "@mui/icons-material"


function App() {
  return (
    <Router>
      <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/fillform' element={<Fillform />} />
      <Route path='/aboutus' element={<AboutUs />} />
      <Route path='/usemap' element={<UseMapp />} />
      <Route path='/usecoordinates' element={<UseCoordinates />} />


      </Routes>
    </Router>
  )
}

export default App;
