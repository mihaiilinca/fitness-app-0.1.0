import { Route, Routes, useLocation } from "react-router-dom";
import ChooseProfile from "./Pages/ChooseProfile.tsx";
import Exercises from "./Pages/Exercises.tsx";
import Food from "./Pages/Food.tsx";
import Home from "./Pages/Home.tsx";
import Login from "./Pages/Login.tsx";
import Register from "./Pages/Register.tsx";


function App() {


  return (
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="home" element={<Home />} />
    <Route path="home/exercises" element={<Exercises />} />
    <Route path="home/food" element={<Food />} />
    <Route path="register" element={<Register />} />
    <Route path="login" element={<Login />} />
    <Route path="chooseProfile" element={<ChooseProfile />} />
    <Route path="*" element={<Home />} />
  </Routes>
  );
}

export default App;
