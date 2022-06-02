import './App.css';
import {BrowserRouter as Router, Routes, Route, Link, BrowserRouter} from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import NavBar from "./components/views/NavBar/NavBar";
import Footer from "./components/views/Footer/Footer";

function App() {
    return (
        <div className="App">
            <NavBar/>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<LandingPage/>}/>
                    <Route exact path="/register" element={<RegisterPage/>}/>
                    <Route exact path="/login" element={<LoginPage/>}/>
                </Routes>
            </BrowserRouter>
            <Footer/>
        </div>
    );
}

export default App;

