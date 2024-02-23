import { useDispatch, useSelector } from "react-redux";
import { changeFood, fetchFood } from "../redux/slices/foodSlice.tsx";
import { selectCookie } from "../redux/slices/userSlice.tsx";
import foodService from "../services/food.tsx";
import React from "react";

function FoodElement(props) {
  const dispatch = useDispatch();
  const cookie = useSelector(selectCookie);

  return (
    <div className=" flex flex-row sm:flex-col bg-slate-200 rounded-xl px-6 sm:px-0 ">
      <div>
        <div className="flex flex-row gap-x-3  p-5 items-center">
          <div className="flex flex-col gap-y-3">
            <div>Name:</div>
            <div>Gewicht:</div>
            <div>Kalorien:</div>
            <div>Fett:</div>
            <div>Kohlenhydrate:</div>
            <div>Eiweiß:</div>
            <div>Salz:</div>
            <div>Balststoffe:</div>
            <div>Getränk:</div>
          </div>
          <div className="flex flex-col w-36 gap-y-3 sm:px-5">
            <h2 className="text-xs">{props.food.name}</h2>
            <h2>{`${props.food.baseAmount} (g)`}</h2>
            <h2>{`${props.food.energy} (g)`}</h2>
            <h2>{`${props.food.fat} (g)`}</h2>
            <h2>{`${props.food.carbohydrates} (g)`}</h2>
            <h2>{`${props.food.protein} (g)`}</h2>
            <h2>{`${props.food.salt} (g)`}</h2>
            <h2>{`${props.food.fiber} (g)`}</h2>
            <h2>{`${props.food.drink === true ? "Ja" : "Nein"}`}</h2>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-row items-center gap-x-5 ml-5 sm:gap-x-0 sm:ml-0 justify-evenly mb-3">
        <button
          className="transition transform hover:scale-125"
          onClick={() => {
            dispatch(changeFood({ newFood: props.food }));
            props.setIsEditing(true);
            props.setShowPopup(true);
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
            await foodService.deleteFood(props.food._id, cookie);
            dispatch(fetchFood());
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
  );
}

export default FoodElement;
