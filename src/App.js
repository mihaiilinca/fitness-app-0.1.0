import React from 'react';
import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';
import './App.css';
import ChooseProfile from "./pages/ChooseProfile.tsx";
import Exercises from "./pages/Exercises.tsx";
import Food from "./pages/Food.tsx";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";


function App() {
  return (
    <Router>
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
  </Router>
  );
}

export default App;
