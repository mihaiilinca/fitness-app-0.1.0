import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button.tsx";
import FoodElement from "../components/FoodElement.tsx";
import HomeHeader from "../components/HomeHeader.tsx";
import PopupFood from "../components/PopupFood.tsx";
import { selectFood } from "../redux/slices/foodSlice.tsx";
import { selectIsLoggedIn } from "../redux/slices/userSlice.tsx";
import { motion } from "framer-motion";

function Food() {
  const food = useSelector(selectFood);
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [showPopup, setShowPopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (isLoggedIn === null || isLoggedIn === false) {
      navigate("/login");
    }
  }, [isLoggedIn]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0 } }}
    >
      <HomeHeader chooseProfile={false} />
      <div className="flex justify-center">
        <div className="gap-y-5 sm:gap-x-5 grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 m-5">
          {food &&
            food.map((food, i) => (
              <FoodElement
                key={i}
                food={food}
                setIsEditing={setIsEditing}
                setShowPopup={setShowPopup}
              />
            ))}
        </div>
      </div>
      <Button
        label={"Mahlzeit hinzufügen"}
        onClick={() => setShowPopup(true)}
      />
      <PopupFood
        trigger={showPopup}
        setShowPopup={setShowPopup}
        setIsEditing={setIsEditing}
        isEditing={isEditing}
      />
    </motion.div>
  );
}

export default Food;
