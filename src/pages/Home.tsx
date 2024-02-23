import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FoodAndExercises } from "../components/FoodAndExercises.tsx";
import HomeHeader from "../components/HomeHeader.tsx";
import {
  fetchExercises,
  selectExerciseStatus,
} from "../redux/slices/exerciseSlice.tsx";
import { fetchFood, selectFoodStatus } from "../redux/slices/foodSlice.tsx";
import { selectIsLoggedIn } from "../redux/slices/userSlice.tsx";
import { CalendarPersonalData } from "./../components/CalendarPersonalData.tsx";
import { motion } from "framer-motion";
import AddElementToDayPopup from "../components/AddElementToDayPopup.tsx";
import DayElementEditPopup from "../components/DayElementPopup.tsx";
import React from "react";

function Home() {
  const dispatch = useDispatch();
  const foodStatus = useSelector(selectFoodStatus);
  const exerciseStatus = useSelector(selectExerciseStatus);
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupEdit, setShowPopupEdit] = useState(false);
  const [showPopupEditLabel, setShowPopupEditLabel] = useState();
  const [foodElement, setFoodElement] = useState();
  const [exerciseElement, setExerciseElement] = useState();
  const [addLabel, setAddLabel] = useState("");

  useEffect(() => {
    if (isLoggedIn === null || isLoggedIn === false) {
      navigate("/login");
      return;
    }

    if (foodStatus === "idle") {
      dispatch(fetchFood());
    }

    if (exerciseStatus === "idle") {
      dispatch(fetchExercises());
    }
  }, [isLoggedIn]);

  if (foodStatus !== "succeeded" || exerciseStatus !== "succeeded") {
    return "";
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0 } }}
      className="mb-7"
    >
      <HomeHeader chooseProfile={false} />
      <div className="flex flex-col sm:gap-x-5 sm:flex-row sm:justify-center">
        <CalendarPersonalData />

        <FoodAndExercises
          setShowPopupEditLabel={setShowPopupEditLabel}
          setShowPopupEdit={setShowPopupEdit}
          setFoodElement={setFoodElement}
          setAddLabel={setAddLabel}
          setShowPopup={setShowPopup}
          setExerciseElement={setExerciseElement}
        />
      </div>

      <AddElementToDayPopup
        trigger={showPopup}
        label={addLabel}
        setShowPopup={setShowPopup}
      />
      <DayElementEditPopup
        trigger={showPopupEdit}
        setShowPopup={setShowPopupEdit}
        label={showPopupEditLabel}
        foodElement={foodElement}
        exerciseElement={exerciseElement}
      />
    </motion.div>
  );
}

export default Home;
