import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button.tsx";
import { fetchDays, selectCurrentDay } from "../redux/slices/daySlice.tsx";
import { selectExercises } from "../redux/slices/exerciseSlice.tsx";
import { selectFood } from "../redux/slices/foodSlice.tsx";
import { selectCurrentProfile } from "../redux/slices/profileSlice.tsx";
import { selectCookie } from "../redux/slices/userSlice.tsx";
import dayService from "../services/day.tsx";
import InputElement from "./InputElement.tsx";
import { motion } from "framer-motion";

function AddElementToDayPopup(props) {
  const dispatch = useDispatch();
  const cookie = useSelector(selectCookie);
  const day = useSelector(selectCurrentDay);
  const food = useSelector(selectFood);
  const exercises = useSelector(selectExercises);
  const profile = useSelector(selectCurrentProfile);

  const [foodId, setFoodId] = useState("");
  const [foodAmount, setFoodAmount] = useState("");
  const [exerciseId, setExerciseId] = useState("");
  const [exerciseTime, setExerciseTime] = useState("");

  const helperDay = useRef({
    _id: null,
    date: null,
    food: null,
    exercise: null,
    profileId: null,
    __v: 0,
  });

  const clearInput = () => {
    setFoodAmount("");
    setExerciseTime("");
  };

  useEffect(() => {
    setFoodId(food[0]._id);
    setExerciseId(exercises[0]._id);
  }, [food, exercises]);

  return props.trigger ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.2 } }}
      exit={{ opacity: 0 }}
      className="flex fixed inset-0 w-full h-screen bg-slate-400 bg-opacity-50 justify-center items-center"
    >
      <div className="p-6 w-full max-w-sm bg-white rounded-xl">
        <div className="flex flex-col">
          <div className="flex justify-end">
            <button
              onClick={() => {
                clearInput();
                props.setShowPopup(false);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <h3 className="flex justify-center text-2xl font-semibold">
            {`${props.label} hinzufügen`}
          </h3>

          <div className="flex flex-col mt-3 items-center">
            {props.label === "Mahlzeit" ? (
              <div className="flex flex-row gap-x-5">
                <div>
                  <h1>Essen auswählen:</h1>
                  <select
                    onChange={(event) => {
                      const value = event.target.value;

                      setFoodId(
                        food[food.findIndex((obj) => obj.name === value)]._id
                      );
                    }}
                  >
                    {food &&
                      food.map((element, i) => (
                        <option key={i}>{element.name}</option>
                      ))}
                  </select>
                </div>

                <div>
                  <InputElement
                    width={"w-16"}
                    value={foodAmount}
                    label={"Menge"}
                    onChange={(event) => {
                      setFoodAmount(event.target.value);
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-row gap-x-5">
                <div>
                  <h1>Übung auswählen:</h1>
                  <select
                    onChange={(event) => {
                      const value = event.target.value;
                      setExerciseId(
                        exercises[
                          exercises.findIndex((obj) => obj.name === value)
                        ]._id
                      );
                    }}
                  >
                    {exercises &&
                      exercises.map((element, i) => (
                        <option key={i}>{element.name}</option>
                      ))}
                  </select>
                </div>

                <div>
                  <InputElement
                    width={"w-16"}
                    value={exerciseTime}
                    label={"Zeit"}
                    onChange={(event) => {
                      setExerciseTime(event.target.value);
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          <Button
            label={"hinzufügen"}
            onClick={async () => {
              helperDay.current = {
                _id: day._id,
                date: day.date,
                food: day.food,
                exercise: day.exercise,
                profileId: day.profileId,
                __v: 0,
              };

              if (props.label === "Mahlzeit") {
                helperDay.current.food = [
                  ...helperDay.current.food,
                  {
                    foodId: foodId,
                    amount: foodAmount,
                  },
                ];
              } else {
                helperDay.current.exercise = [
                  ...helperDay.current.exercise,
                  {
                    exerciseId: exerciseId,
                    timeInMinutes: exerciseTime,
                  },
                ];
              }
              await dayService.updateDayById(cookie, helperDay.current);
              dispatch(fetchDays({ profileId: profile._id, cookie: cookie }));
              props.setShowPopup(false);

              clearInput();
            }}
          />
        </div>
      </div>
    </motion.div>
  ) : (
    ""
  );
}

export default AddElementToDayPopup;
