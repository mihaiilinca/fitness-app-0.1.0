import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDays, selectCurrentDay } from "../redux/slices/daySlice.tsx";
import dayService from "../services/day.tsx";
import React from "react";

function DayFoodElement(props) {
  const dispatch = useDispatch();
  const day = useSelector(selectCurrentDay);
  const [food, setFood] = useState();
  const helperDay = useRef({
    _id: null,
    date: null,
    food: null,
    exercise: null,
    profileId: null,
    __v: 0,
  });

  useEffect(() => {
    const foodToFind = props.food.find(
      (obj) => obj._id === props.element.foodId
    );
    setFood(foodToFind && foodToFind.name);
  }, [food]);

  return (
    food && (
      <div className="flex flex-row justify-between m-2">
        <div className="flex flex-row gap-x-1">
          <h1>{food}</h1>
          <h1>{`- ${props.element.amount} Gramm`}</h1>
        </div>

        <div className="flex flex-row gap-x-3">
          <button
            className="transition transform hover:scale-125"
            onClick={() => {
              props.setShowPopupEditLabel("Mahlzeit");
              props.setShowPopupEdit(true);
              props.setFoodElement(props.element);
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
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </button>
          <button
            className="transition transform hover:scale-125"
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

              helperDay.current.food.forEach((element, i) => {
                if (element._id !== props.element._id) {
                  newArray.push(element);
                }
              });

              helperDay.current.food = newArray;

              await dayService.updateDayById(props.cookie, helperDay.current);
              dispatch(
                fetchDays({
                  profileId: props.profile._id,
                  cookie: props.cookie,
                })
              );
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
    )
  );
}

export default DayFoodElement;
