import { Route, Routes, useLocation } from "react-router-dom";
import ChooseProfile from "./pages/ChooseProfile.tsx";
import Exercises from "./pages/Exercises.tsx";
import Food from "./pages/Food.tsx";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";

import { AnimatePresence } from "framer-motion";

function App() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen ">
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="home/exercises" element={<Exercises />} />
          <Route path="home/food" element={<Food />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="chooseProfile" element={<ChooseProfile />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
