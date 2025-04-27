import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptainSignup from "./pages/CaptainSignup";
import CaptainLogin from "./pages/CaptainLogin";
// import Start from "./pages/Start";


const App = () => {
    return (
        <Routes>
            {/* <Route path="/" element={<Start />} /> */}
            <Route path="/" element={<Home />} />
            <Route path="/users/login" element={<UserLogin />} />
            <Route path="/users/signup" element={<UserSignup />} />
            <Route path="/captains/signup" element={<CaptainSignup />} />
            <Route path="/captains/login" element={<CaptainLogin />} />
        </Routes>
    );
}

export default App;