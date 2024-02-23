import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button.tsx";
import InputElement from "../components/InputElement.tsx";
import { fetchDays, selectCurrentDay } from "../redux/slices/daySlice.tsx";
import { selectCurrentProfile } from "../redux/slices/profileSlice.tsx";
import { selectCookie } from "../redux/slices/userSlice.tsx";
import dayService from "../services/day.tsx";
import { motion } from "framer-motion";
import React from "react";

function DayElementEditPopup(props) {
  const cookie = useSelector(selectCookie);
  const profile = useSelector(selectCurrentProfile);
  const [foodAmount, setFoodAmount] = useState("");
  const [exerciseTime, setExerciseTime] = useState("");
  const dispatch = useDispatch();
  const day = useSelector(selectCurrentDay);
  const helperDay = useRef({
    _id: null,
    date: null,
    food: null,
    exercise: null,
    profileId: null,
    __v: 0,
  });

  useEffect(() => {
    props.foodElement && setFoodAmount(props.foodElement.amount);

    props.exerciseElement &&
      setExerciseTime(props.exerciseElement.timeInMinutes);
  }, [props.foodElement, props.exerciseElement]);

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
                setFoodAmount("");
                setExerciseTime("");
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
            {`${props.label} bearbeiten`}
          </h3>

          <div className="flex flex-col mt-3 items-center">
            {props.label === "Mahlzeit" ? (
              <div className="flex flex-row gap-x-5">
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
            label={"speichern"}
            onClick={async () => {
              helperDay.current = {
                _id: day._id,
                date: day.date,
                food: day.food,
                exercise: day.exercise,
                profileId: day.profileId,
                __v: 0,
              };

              let newArray = [];

              if (props.label === "Mahlzeit") {
                helperDay.current.food.forEach((element, i) => {
                  if (element._id === props.foodElement._id) {
                    newArray.push({
                      _id: element._id,
                      foodId: element.foodId,
                      amount: foodAmount,
                    });
                  } else {
                    newArray.push(element);
                  }
                });

                helperDay.current.food = newArray;
              } else {
                helperDay.current.exercise.forEach((element, i) => {
                  if (element._id === props.exerciseElement._id) {
                    newArray.push({
                      _id: element._id,
                      exerciseId: element.exerciseId,
                      timeInMinutes: exerciseTime,
                    });
                  } else {
                    newArray.push(element);
                  }
                });

                helperDay.current.exercise = newArray;
              }

              await dayService.updateDayById(cookie, helperDay.current);
              dispatch(
                fetchDays({
                  profileId: profile._id,
                  cookie: cookie,
                })
              );
              props.setShowPopup(false);
            }}
          />
        </div>
      </div>
    </motion.div>
  ) : (
    ""
  );
}

export default DayElementEditPopup;
